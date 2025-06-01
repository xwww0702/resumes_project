<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { ResumeComponent } from '../type/Resume'
import BasicInfoPreview from './preview/BasicInfoPreview.vue'

const scale = ref(0.7)
const minScale = 0.5
const maxScale = 1.5
const scaleStep = 0.1

const resumeComponents = ref<ResumeComponent[]>([])

// 组件映射
const componentMap = {
    'BasicInfoPreview': BasicInfoPreview
}

// 定义页面类型
interface ResumePage {
    components: ResumeComponent[]
}

// 静态高度分页
const pages = computed<ResumePage[]>(() => {
    const result: ResumePage[] = []
    let currentPage: ResumePage = { components: [] }
    let currentHeight = 0
    const maxPageHeight = 297 * 3.78 - 80 // 297mm 转换为像素，减去内边距

    if (resumeComponents.value.length === 0) {
        return [{ components: [] }]
    }

    for (const component of resumeComponents.value) {
        const componentHeight = 300 // 假定每个组件高度为100px
        if (currentHeight + componentHeight > maxPageHeight) {
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

// 拖拽添加组件
const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const componentData = e.dataTransfer?.getData('component')
    if (componentData) {
        try {
            const component = JSON.parse(componentData) as ResumeComponent
            if (component.preview && componentMap[component.preview as keyof typeof componentMap]) {
                const newComponent = {
                    ...component,
                    id: `${component.id}-${Date.now()}`
                }
                resumeComponents.value.push(newComponent)
            }
        } catch (error) {
            console.error('Error parsing component data:', error)
        }
    }
}

// 处理拖拽悬停
const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'copy'
}

// 处理拖拽离开
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

// 处理触摸板手势
const handleWheel = (e: WheelEvent) => {
    // 检查是否按下了 Ctrl 键（Mac 上的 Command 键）
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        
        // 根据滚轮方向决定缩放方向
        if (e.deltaY < 0) {
            // 向上滚动，放大
            if (scale.value < maxScale) {
                scale.value = Math.min(scale.value + scaleStep, maxScale)
            }
        } else {
            // 向下滚动，缩小
            if (scale.value > minScale) {
                scale.value = Math.max(scale.value - scaleStep, minScale)
            }
        }
    }
}

// 组件挂载时添加事件监听
onMounted(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
})

// 组件卸载时移除事件监听
onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
})

function removeComponent(id: string) {
    const idx = resumeComponents.value.findIndex(c => c.id === id)
    if (idx !== -1) {
        resumeComponents.value.splice(idx, 1)
    }
}
</script>

<template>
    <div class="resume-preview-container">
        <div class="zoom-controls">
            <el-button-group>
                <el-button @click="zoomOut" :disabled="scale <= minScale">
                    <el-icon><ZoomOut /></el-icon>
                </el-button>
                <el-button @click="resetZoom">{{ Math.round(scale * 100) }}%</el-button>
                <el-button @click="zoomIn" :disabled="scale >= maxScale">
                    <el-icon><ZoomIn /></el-icon>
                </el-button>
            </el-button-group>
        </div>
        <div class="preview-scale-wrapper" :style="{ transform: `scale(${scale})`, transformOrigin: 'top center' }">
            <div class="resume-pages">
                <div
                    v-for="(page, index) in pages"
                    :key="index"
                    class="resume-preview"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @dragleave="handleDragLeave"
                >
                    <div class="preview-content">
                        <div v-for="component in page.components" :key="component.id" class="resume-component-wrapper">
                            <component
                                :is="component.preview ? componentMap[component.preview as keyof typeof componentMap] : null"
                            />
                            <button class="delete-btn" @click="removeComponent(component.id)">×</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.zoom-controls {
    position: sticky;
    top: 5px;
    z-index: 100;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.5);
    padding: 3px;
    border-radius: 3px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.zoom-controls:hover {
    background: rgba(255, 255, 255, 0.9);
}

.zoom-controls :deep(.el-button) {
    padding: 2px 6px;
    font-size: 11px;
    height: 24px;
    line-height: 1;
}

.zoom-controls :deep(.el-button-group) {
    display: flex;
    align-items: center;
}

.zoom-controls :deep(.el-icon) {
    font-size: 12px;
}

.resume-preview-container {
    height: 100%;
    background-color: #f5f5f5;
    background-image: 
        linear-gradient(rgba(200, 200, 200, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    overflow-y: auto;
    position: relative;
}

.preview-scale-wrapper {
    width: fit-content;
    margin: 0 auto;
}

.resume-pages {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
}

.resume-preview {
    background: #fff;
    width: 210mm;
    height: 297mm;
    padding: 40px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}

.preview-inner {
    width: 100%;
    height: 100%;
    transform-origin: top center;
}

.preview-header {
    text-align: center;
    margin-bottom: 40px;
}

.preview-header h1 {
    font-size: 28px;
    color: #333;
    font-weight: bold;
}

.preview-content {
    width: 100%;
    height: calc(100% - 120px); /* 减去头部和padding的高度 */
    overflow: hidden;
}

/* 预览组件的样式覆盖 */
:deep(.basic-info-preview) {
    width: 100%;
    min-width: 0;
    transform: none;
    transform-origin: top left;
    border: none;
    box-shadow: none;
    cursor: default;
}

:deep(.basic-info-preview:hover) {
    transform: none;
    box-shadow: none;
}

:deep(.basic-info-preview .preview-header h2) {
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
}

:deep(.basic-info-preview .info-item) {
    font-size: 14px;
    margin-bottom: 15px;
}

:deep(.basic-info-preview .label) {
    width: 80px;
    color: #666;
    font-weight: 500;
}

:deep(.basic-info-preview .value) {
    color: #333;
    flex: 1;
}

/* 自定义滚动条样式 */
.resume-preview::-webkit-scrollbar {
    width: 6px;
}

.resume-preview::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.resume-preview::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.resume-preview::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.resume-component-wrapper {
    position: relative;
}
.delete-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 10;
    background: #f56c6c;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    opacity: 0.85;
    transition: background 0.2s, opacity 0.2s;
}
.delete-btn:hover {
    background: #d93030;
    opacity: 1;
}
</style> 