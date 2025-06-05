<script lang="ts" setup>
import { computed } from 'vue'
import type { ResumeComponentType } from '../type/Resume'
import CommonEditor from './editor/CommonEditor.vue'
import editorConfigs from '../config/editorConfigs'
import { componentTemplates } from '../config/componentTemplates'
import { useComponentStore } from '../store/useComponentStore'
import { storeToRefs } from 'pinia'

const store = useComponentStore()
const { selectedComponent } = storeToRefs(store)

// 获取当前组件的编辑器配置
const currentConfig = computed(() => {
    if (!selectedComponent.value) return null
    return editorConfigs[selectedComponent.value.type as ResumeComponentType]
})

// 处理表单提交
const handleSubmit = (data: any) => {
    if (selectedComponent.value) {
        console.log(data,'111hhhh');
        store.updateComponentData(selectedComponent.value.id, data)
    }
}
</script>

<template>
    <div class="h-full p-4">
        <template v-if="selectedComponent">
            <h3 class="text-lg font-medium text-gray-800 mb-6 pb-2 border-b border-gray-100">
                {{ componentTemplates[selectedComponent.type].title }}
            </h3>
            <CommonEditor
                v-if="currentConfig"
                :component="selectedComponent"
                :config="currentConfig"
                @submit="handleSubmit"
            />
        </template>
        <div v-else class="h-full flex items-center justify-center text-gray-400 text-sm">
            请从组件市场选择一个组件进行编辑
        </div>
    </div>
</template>

<style scoped>

</style>