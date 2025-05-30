<script lang="ts" setup>
import { ref } from 'vue'
import type { ResumeComponent } from '../type/Resume'
import BasicInfoPreview from './preview/BasicInfoPreview.vue'

// 当前选中的组件
const selectedComponent = ref<ResumeComponent | null>(null)

// 当前激活的tab
const activeTab = ref('components')

// 组件映射
const componentMap = {
    'BasicInfoPreview': BasicInfoPreview
}

// 组件市场数据
const componentList: ResumeComponent[] = [
    {
        id: 'basic-info',
        name: '基本信息',
        icon: 'user',
        type: 'basic',
        preview: 'BasicInfoPreview'
    },
    {
        id: 'education',
        name: '教育经历',
        icon: 'graduation-cap',
        type: 'education',
        preview: null
    },
    {
        id: 'work',
        name: '工作经历',
        icon: 'briefcase',
        type: 'work',
        preview: null
    },
    {
        id: 'project',
        name: '项目经历',
        icon: 'code',
        type: 'project',
        preview: null
    },
    {
        id: 'skills',
        name: '技能特长',
        icon: 'star',
        type: 'skills',
        preview: null
    }
]

// 处理组件选中
const handleComponentSelect = (component: ResumeComponent) => {
    selectedComponent.value = component
    activeTab.value = 'editor'
}

// 处理组件拖拽开始
const handleDragStart = (e: DragEvent, component: ResumeComponent) => {
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'copy'
        // 创建一个新的组件对象，确保包含所有必要的数据
        const componentData = {
            ...component,
            preview: component.preview
        }
        console.log('Dragging component:', componentData) // 调试日志
        e.dataTransfer.setData('component', JSON.stringify(componentData))
    }
}
</script>

<template>
    <div class="resume-comp-part">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="组件市场" name="components">
                <div class="component-market">
                    <div
                        v-for="component in componentList"
                        :key="component.id"
                        class="component-item"
                        draggable="true"
                        @dragstart="(e) => handleDragStart(e, component)"
                        @click="handleComponentSelect(component)"
                    >
                        <template v-if="component.preview">
                            <component 
                                :is="componentMap[component.preview as keyof typeof componentMap]"
                                class="market-preview"
                            />
                        </template>
                        <div v-else class="component-placeholder">
                            <el-icon>
                                <component :is="component.icon" />
                            </el-icon>
                            <span>{{ component.name }}</span>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="编辑面板" name="editor">
                <div class="editor-panel">
                    <template v-if="selectedComponent">
                        <div class="editor-header">
                            <h3>{{ selectedComponent.name }}</h3>
                        </div>
                        <div class="editor-content">
                            <!-- 后续添加具体的编辑表单 -->
                            <p>编辑 {{ selectedComponent.name }} 的内容</p>
                        </div>
                    </template>
                    <div v-else class="no-selection">
                        <el-empty description="请选择一个组件进行编辑" />
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped>
.resume-comp-part {
    height: 100%;
    padding: 10px;
    background: #fff;
    border-right: 1px solid #e0e0e0;
    box-sizing: border-box;
    overflow: hidden;
}

.component-market {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

.component-item {
    cursor: move;
    width: 100%;
    min-width: 0; /* 防止内容溢出 */
    transition: all 0.3s;
}

.component-item:hover {
    transform: translateY(-2px);
}

.component-placeholder {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #f5f7fa;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    transition: all 0.3s;
    width: 100%;
    box-sizing: border-box;
    min-width: 0; /* 防止内容溢出 */
}

.component-placeholder:hover {
    background: #ecf5ff;
    border-color: #409eff;
}

.component-placeholder .el-icon {
    font-size: 16px;
    color: #409eff;
}

.editor-panel {
    height: 100%;
}

.editor-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.editor-header h3 {
    margin: 0;
    font-size: 16px;
    color: #303133;
}

.editor-content {
    padding: 10px 0;
}

.no-selection {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 组件市场中的预览组件样式 */
.market-preview {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px;
    cursor: move;
    transition: all 0.3s;
    width: 100%;
    box-sizing: border-box;
}

.market-preview:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #409eff;
}

.market-preview :deep(.preview-header h2) {
    font-size: 16px;
    margin: 0 0 10px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

.market-preview :deep(.info-item) {
    font-size: 12px;
    margin-bottom: 8px;
}

.market-preview :deep(.label) {
    width: 60px;
}

.market-preview :deep(.value) {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>