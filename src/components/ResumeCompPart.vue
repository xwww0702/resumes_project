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
    store.selectComponent(component)
    activeTab.value = 'editor'
}

watch(() => store.selectedComponent, (newVal) => {
    if (newVal) {
        activeTab.value = 'editor'
    }
})
</script>

<template>
    <div class="h-full flex flex-col bg-white border-r border-gray-200 mb-10 pb-6">
        <el-tabs 
            v-model="activeTab" 
            class="flex-1 flex flex-col ml-1"
        >
            <el-tab-pane 
                label="组件市场" 
                name="components"
            >
                <MarketPart @select="handleComponentSelect" />
            </el-tab-pane>
            <el-tab-pane 
                label="编辑面板" 
                name="editor"
            >
                <EditPart />
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<style scoped>
:deep(.el-tabs) {
    height: 100%;
    /* display: flex;
    flex-direction: column; */
}

:deep(.el-tabs__content) {
    flex: 1;
    overflow-y: auto;
}

:deep(.el-tabs__content::-webkit-scrollbar) {
    width: 4px;
}

:deep(.el-tabs__content::-webkit-scrollbar-track) {
    background: #f3f4f6;
}

:deep(.el-tabs__content::-webkit-scrollbar-thumb) {
    background: #d1d5db;
    border-radius: 2px;
}

:deep(.el-tabs__content::-webkit-scrollbar-thumb:hover) {
    background: #9ca3af;
}

:deep(.el-tabs__nav-wrap) {
    padding: 0 1px;
}

:deep(.el-tabs__header) {
    margin-bottom: 1rem;
    flex-shrink: 0; /* Prevent header from shrinking */
}

:deep(.el-tab-pane) {
    /* No height or overflow styles needed here, parent handles it */
}

:deep(.el-tabs__item) {
    color: #4b5563;
    font-weight: normal;
}

:deep(.el-tabs__item.is-active) {
    color: #3b82f6;
    font-weight: 500;
}
</style>