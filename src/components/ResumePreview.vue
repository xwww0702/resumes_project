<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch, type DefineProps } from 'vue'
import type { ResumeComponent, ResumeData } from '../type/Resume'
import CommonPreview from './preview/CommonPreview.vue'
import ImagePreview from './preview/ImagePreview.vue'
import { ZoomOut, ZoomIn } from '@element-plus/icons-vue'
import { useComponentStore } from '../store/useComponentStore'
import { handleWheel, zoomOut, zoomIn, resetZoom, scale, minScale, maxScale } from '../hooks/useZooms'
import throttle from 'lodash/throttle'
import { useResumeStore } from '../store/useResumeStore'
import { storeToRefs } from 'pinia'

const store = useComponentStore()
const { componentList } = storeToRefs(store)
const { addComponent, removeComponent, componentRefs, componentHeights, updateComponent } = store
const resumeStore = useResumeStore()
const props = defineProps<{
  id: string
}>()
const componentData = new Map<string, any>()

const {createNewResume} = useResumeStore()
// 定义页面类型
interface ResumePage {
    components: ResumeComponent[]
}

// 使用 throttle 优化高度更新
const updateComponentHeight = throttle((id: string, height: number) => {
    if (height > 0) {
        componentHeights.set(id, height)
        computePages()
    }
}, 100)

function setComponentRef(id: string, el: HTMLElement | null) {
    if (el) {
        componentRefs.set(id, el)
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                updateComponentHeight(id, entry.contentRect.height)
            }
        })
        observer.observe(el)
    }
}

const resumePagesRef = ref()
let maxPageHeight = ref(0)

// 计算分页
const pages = ref<ResumePage[]>([])

const computePages = (): void => {
    const result: ResumePage[] = []
    let currentPage: ResumePage = { components: [] }
    let currentHeight = 0
    const pageHeight = maxPageHeight.value || 297 * 3.78 // 默认A4纸高度（297mm * 3.78px/mm）
    const minComponentHeight = 20 // 最小组件高度

    if (componentList.value.length === 0) {
        pages.value = [{ components: [] }]
        return
    }

    for (const component of componentList.value) {
        const componentHeight = componentHeights.get(component.id) || minComponentHeight
        
        // 如果当前组件高度超过页面高度，创建新页面
        if (componentHeight > pageHeight) {
            if (currentPage.components.length > 0) {
                result.push(currentPage)
            }
            result.push({ components: [component] })
            currentPage = { components: [] }
            currentHeight = 0
            continue
        }

        // 如果添加当前组件会超出页面高度，创建新页面
        if (currentHeight + componentHeight > pageHeight) {
            result.push(currentPage)
            currentPage = { components: [component] }
            currentHeight = componentHeight
        } else {
            currentPage.components.push(component)
            currentHeight += componentHeight
        }
    }

    if (currentPage.components.length > 0) {
        result.push(currentPage)
    }

    pages.value = result
}

const computedPages = computed<ResumePage[]>(() => {
    computePages()
    return pages.value
})

onMounted(() => {
    if(props.id){
        const resume = resumeStore.resumeList.find((r: ResumeData) => r.id === props.id)
        if (resume) {
            componentList.value = resume.content
        }
    }
    nextTick(() => {
        if (resumePagesRef.value) {
            maxPageHeight.value = resumePagesRef.value.offsetHeight - 40 // 减去上下内边距和边距
            computePages()
        }
    })
})

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const componentData = e.dataTransfer?.getData('component')
    if (componentData) {
        try {
            const component = JSON.parse(componentData)
            if (!component.type) {
                console.error('Component type is missing')
                return
            }
            
            const newComponent = addComponent(component.type)
            if (!newComponent) {
                console.error('Failed to create new component')
                return
            }
            
            // 更新组件数据
            updateComponent(newComponent.id, {
                title: component.title,
                fields: component.fields
            })
            
            nextTick(() => {
                const el = componentRefs.get(newComponent.id)
                if (el) {
                    updateComponentHeight(newComponent.id, el.offsetHeight)
                }
            })
        } catch (error) {
            console.error('Error parsing component data:', error)
        }
    }
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy'
    }
}

const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
}

onMounted(() => {
    window.addEventListener('wheel', handleWheel, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
})

const updateComponentData = (id: string, data: any) => {
    componentData.set(id, data)
}

const emit = defineEmits<{
    (e: 'edit', component: ResumeComponent): void
}>()

const handleComponentClick = (component: ResumeComponent) => {
    store.selectComponent(component)
    emit('edit', component)
    
}

watch(() => componentList, () => {
    nextTick(() => {
        componentList.value.forEach(component => {
            const el = componentRefs.get(component.id)
            if (el) {
                updateComponentHeight(component.id, el.offsetHeight)
            }
        })
    })
}, { deep: true })

defineExpose({
    updateComponentData
})
</script>

<template>
    <div class="h-full bg-gray-100 flex flex-col items-center overflow-y-auto relative bg-grid">
        <div class="sticky top-2 z-10 mb-3 bg-white/50 p-1 rounded shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-white/90">
            <el-button-group>
                <el-button @click="zoomOut" :disabled="scale <= minScale" class="!h-6 !text-xs">
                    <el-icon class="!text-xs"><ZoomOut /></el-icon>
                </el-button>
                <el-button @click="resetZoom" class="!h-6 !text-xs">{{ Math.round(scale * 100) }}%</el-button>
                <el-button @click="zoomIn" :disabled="scale >= maxScale" class="!h-6 !text-xs">
                    <el-icon class="!text-xs"><ZoomIn /></el-icon>
                </el-button>
            </el-button-group>
        </div>
        <div 
            class="w-fit mx-auto origin-top"
            :style="{ transform: `scale(${scale})` }"
        >
            <div class="flex flex-col" ref="resumePagesRef">
                <div
                    v-for="(page, index) in computedPages"
                    :key="index"
                    class="w-[210mm] h-[297mm] bg-white shadow-lg rounded-lg p-5 box-border relative flex flex-col"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @dragleave="handleDragLeave"
                >
                    <div class="flex-1 flex flex-col">
                        <div
                            v-for="component in page.components"
                            :key="component.id"
                            class="relative group"
                            :ref="el => setComponentRef(component.id, el as HTMLElement)"
                            @click="handleComponentClick(component)"
                        >
                            <CommonPreview
                                v-if="(component.type !== 'image-left')&&(component.type !== 'image-right')"
                                :type="component.type"
                                :fields="component.fields"
                                :key="`common-${component.id}`"
                                class="cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200"
                            />
                            <ImagePreview
                                v-if="(component.type === 'image-left')||(component.type === 'image-right')"
                                :type="component.type"
                                :fields="component.fields"
                                :key="`image-${component.id}`"
                                :align ='component.align'
                                class="cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200"
                            />
                            <button 
                                class="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-85 hover:opacity-100 hover:bg-red-600 transition-colors flex items-center justify-center text-sm leading-none"
                                @click.stop="removeComponent(component.id)"
                            >×</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-grid {
    @apply bg-[length:20px_20px];
    background-image: 
        linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px);
}
</style> 