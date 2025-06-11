<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import type { ResumeComponent } from '../type/Resume'
import EditPart from './EditPart.vue'
import MarketPart from './MarketPart.vue'
import { useComponentStore } from '../store/useComponentStore'

const store = useComponentStore()

// 当前激活的tab
const activeTab = computed({
    get: () => store.activeTab,
    set: (value) => store.activeTab = value
})

// 处理组件选中
const handleComponentSelect = (component: ResumeComponent) => {
    store.selectComponent(component.id)
}

watch(() => store.selectedComponent, (newVal) => {
    // console.log(newVal, '1133331hhhh')
})
</script>

<template>
    <div class="h-full flex flex-col bg-white border-r border-gray-200">
        <el-tabs 
            v-model="activeTab" 
            class="flex-1 flex flex-col ml-1"
        >
            <el-tab-pane 
                label="组件市场" 
                name="components"
                class="h-full"
            >
                <MarketPart @select="handleComponentSelect" />
            </el-tab-pane>
            
            <el-tab-pane 
                label="编辑面板" 
                name="editor"
                class="h-full"
            >
                <EditPart :selected-component="store.selectedComponent" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped>
:deep(.el-tabs) {
    height: 100%;
}

:deep(.el-tabs__content) {
    flex: 1;
    overflow: hidden;
}

:deep(.el-tabs__nav-wrap) {
    padding: 0 1px;
}

:deep(.el-tabs__header) {
    margin-bottom: 1rem;
}

:deep(.el-tab-pane) {
    height: 100%;
}

:deep(.el-tabs__item) {
    color: #4b5563;
    font-weight: normal;
}

:deep(.el-tabs__item.is-active) {
    color: #3b82f6;
    font-weight: 500;
}

.comp-container {
    height: 100%;
    background-color: white;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    /* padding: 10px; */
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
    min-width: 0;
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
    min-width: 0;
}

.component-placeholder:hover {
    background: #ecf5ff;
    border-color: #409eff;
}

.component-placeholder .el-icon {
    font-size: 16px;
    color: #409eff;
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