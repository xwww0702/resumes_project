<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import type { ResumeComponent } from '../type/Resume'
import CommonPreview from './preview/CommonPreview.vue'
import {ZoomOut,ZoomIn} from '@element-plus/icons-vue'
import { useComponentStore } from '../store/useComponentStore'

const store = useComponentStore()

const scale = ref(0.7)
const minScale = 0.5
const maxScale = 1.5
const scaleStep = 0.1

const resumeComponents = ref<ResumeComponent[]>([])
const componentRefs = new Map<string, HTMLElement>()
const componentHeights = new Map<string, number>()
const componentData = new Map<string, any>()

const componentMap = {
    'CommonPreview': CommonPreview
}

// 定义页面类型
interface ResumePage {
    components: ResumeComponent[]
}

function setComponentRef(id: string, el: HTMLElement | null) {
    if (el) {
        componentRefs.set(id, el)
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                componentHeights.set(id, entry.contentRect.height)
            }
        })
        observer.observe(el)
    }
}
const resumePagesRef = ref()
let maxPageHeight = ref(0)
onMounted(() => {
  nextTick(() => {
    if (resumePagesRef.value) {
      maxPageHeight.value = resumePagesRef.value.offsetHeight
      console.log('页高:', maxPageHeight.value)
    }
  })
})
// 静态高度分页
const pages = computed<ResumePage[]>(() => {
    const result: ResumePage[] = []
    let currentPage: ResumePage = { components: [] }
    let currentHeight = 0
    let height = maxPageHeight.value - 60 //减去padding


    if (resumeComponents.value.length === 0) {
        return [{ components: [] }]
    }

    for (const component of resumeComponents.value) {
        const componentHeight = componentHeights.get(component.id) || 185
        
        if (currentHeight + componentHeight > height) {
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
    return result
})

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const componentData = e.dataTransfer?.getData('component')
    if (componentData) {
        try {
            const component = JSON.parse(componentData) as ResumeComponent
            const newComponent = {
                ...component,
                id: `${component.type}-${Date.now()}`
            }
            resumeComponents.value.push(newComponent)
            nextTick(() => {
                const el = componentRefs.get(newComponent.id)
                if (el) {
                    componentHeights.set(newComponent.id, el.offsetHeight)
                }
            })
        } catch (error) {
            console.error('Error parsing component data:', error)
        }
    }
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'copy'
}

const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
}

const zoomIn = () => {
    if (scale.value < maxScale) {
        scale.value = Math.min(scale.value + scaleStep, maxScale)
    }
}

const zoomOut = () => {
    if (scale.value > minScale) {
        scale.value = Math.max(scale.value - scaleStep, minScale)
    }
}

const resetZoom = () => {
    scale.value = 1
}

const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        if (e.deltaY < 0) {
            if (scale.value < maxScale) {
                scale.value = Math.min(scale.value + scaleStep, maxScale)
            }
        } else {
            if (scale.value > minScale) {
                scale.value = Math.max(scale.value - scaleStep, minScale)
            }
        }
    }
}

onMounted(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
})

function removeComponent(id: string) {
    const idx = resumeComponents.value.findIndex(c => c.id === id)
    if (idx !== -1) {
        resumeComponents.value.splice(idx, 1)
        componentRefs.delete(id)
        componentHeights.delete(id)
    }
}

// 更新组件数据
const updateComponentData = (id: string, data: any) => {
    componentData.set(id, data)
}

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
            <div class="flex flex-col gap-2" ref="resumePagesRef">
                <div
                    v-for="(page, index) in pages"
                    :key="index"
                    class="w-[210mm] h-[297mm] bg-white shadow-lg rounded-lg p-1 box-border relative flex flex-col"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @dragleave="handleDragLeave"
                >
                    <div class="flex-1">
                        <div
                            v-for="component in page.components"
                            :key="component.id"
                            class="relative"
                            :ref="el => setComponentRef(component.id, el as HTMLElement)"
                        >
                            <CommonPreview
                                :type="component.type"
                                :data="component.data"
                            />
                            <button 
                                class="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white opacity-85 hover:opacity-100 hover:bg-red-600 transition-colors flex items-center justify-center text-sm leading-none"
                                @click="removeComponent(component.id)"
                            >×</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 自定义网格背景 */
.bg-grid {
    @apply bg-[length:20px_20px];
    background-image: 
        linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px);
}
</style> 