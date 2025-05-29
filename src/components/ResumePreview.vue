<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scale = ref(0.7)
const minScale = 0.5
const maxScale = 1.5
const scaleStep = 0.1

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
</script>

<template>
    <div class="resume-preview-container">
        <div class="zoom-controls">
            <el-button-group>
                <el-button @click="zoomOut" :disabled="scale <= minScale">
                    <el-icon><ZoomOut /></el-icon>
                </el-button>
                <el-button @click="resetZoom">
                    {{ Math.round(scale * 100) }}%
                </el-button>
                <el-button @click="zoomIn" :disabled="scale >= maxScale">
                    <el-icon><ZoomIn /></el-icon>
                </el-button>
            </el-button-group>
        </div>
        <div class="resume-preview" :style="{ transform: `scale(${scale})`, transformOrigin: 'top center' }">
            <div class="preview-header">
                <h1>个人简历</h1>
            </div>
            <div class="preview-content">
                <div class="basic-info">
                    <h2>基本信息</h2>
                    <div class="info-item">
                        <span class="label">姓名：</span>
                        <span class="value">张三</span>
                    </div>
                    <div class="info-item">
                        <span class="label">年龄：</span>
                        <span class="value">25岁</span>
                    </div>
                    <div class="info-item">
                        <span class="label">电话：</span>
                        <span class="value">138****8888</span>
                    </div>
                    <div class="info-item">
                        <span class="label">邮箱：</span>
                        <span class="value">example@email.com</span>
                    </div>
                </div>
                
                <div class="education">
                    <h2>教育经历</h2>
                    <div class="education-item">
                        <div class="time">2019-2023</div>
                        <div class="school">XX大学</div>
                        <div class="major">计算机科学与技术</div>
                    </div>
                </div>

                <div class="experience">
                    <h2>工作经历</h2>
                    <div class="experience-item">
                        <div class="time">2023-至今</div>
                        <div class="company">XX科技有限公司</div>
                        <div class="position">前端开发工程师</div>
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
    padding: 10px 20px;
    overflow-y: auto;
    position: relative;
}

.resume-preview {
    background: #fff;
    width: 210mm; /* A4纸宽度 */
    min-height: 297mm; /* A4纸高度 */
    padding: 40px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: relative;
    margin: 20px 0;
    transition: transform 0.2s ease;
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
    max-width: 800px;
    margin: 0 auto;
}

.basic-info, .education, .experience {
    margin-bottom: 40px;
}

h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
    font-weight: bold;
}

.info-item {
    margin-bottom: 15px;
    display: flex;
}

.label {
    width: 80px;
    color: #666;
    font-weight: 500;
}

.value {
    color: #333;
    flex: 1;
}

.education-item, .experience-item {
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 3px solid #eee;
}

.time {
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
}

.school, .company {
    font-weight: bold;
    margin: 5px 0;
    color: #333;
}

.major, .position {
    color: #666;
    margin-top: 5px;
}
</style> 