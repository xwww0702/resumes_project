<script lang="ts" setup>
import { computed } from 'vue'
import type { ResumeComponent, ResumeComponentType } from '../type/Resume'
import CommonEditor from './editor/CommonEditor.vue'
import editorConfigs from '../config/editorConfigs'
import { componentTemplates } from '../config/componentTemplates'
import { useComponentStore } from '../store/useComponentStore'

const props = defineProps<{
    selectedComponent: ResumeComponent | null
}>()

const store = useComponentStore()

// 获取当前组件的编辑器配置
const currentConfig = computed(() => {
    if (!props.selectedComponent) return null
    return editorConfigs[props.selectedComponent.type as ResumeComponentType]
})

// 处理表单提交
const handleSubmit = (data: any) => {
    if (props.selectedComponent) {
        store.updateComponentData(props.selectedComponent.id, data)
    }
}
</script>

<template>
    <div class="h-full p-4">
        <template v-if="selectedComponent">
            <h3 class="text-lg font-medium text-gray-800 mb-6 pb-2 border-b border-gray-100">{{ componentTemplates[selectedComponent.type].title }}</h3>
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