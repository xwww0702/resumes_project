<script lang="ts" setup>
import { computed } from 'vue'
import type { ResumeComponentType, FormField } from '../type/Resume'
import CommonEditor from './editor/CommonEditor.vue'
import editorConfigs from '../config/editorConfigs'
import { componentTemplates } from '../config/componentTemplates'
import { previewTemplates } from '../config/previewTemplates'
import { useComponentStore } from '../store/useComponentStore'
import { storeToRefs } from 'pinia'

const store = useComponentStore()
const { selectedComponent } = storeToRefs(store)

// 获取当前组件的编辑器配置
const currentConfig = computed(() => {
    console.log(selectedComponent.value,'selectedComponent');
    if (!selectedComponent.value) return null
    return editorConfigs[selectedComponent.value.type as ResumeComponentType]
})

// 处理表单提交
const handleSubmit = (data: any) => {
    if (selectedComponent.value) {
        store.updateComponentData(selectedComponent.value.id, data)
    }
}

// 处理布局变更
const handleLayoutChange = (fields: FormField[]) => {
    if (selectedComponent.value) {
        const type = selectedComponent.value.type as ResumeComponentType
        const config = editorConfigs[type]
        const previewConfig = previewTemplates[type]
        
        if (config && previewConfig) {
            // 更新编辑器配置
            config.fields = [...fields]

            // 同步更新预览模板配置
            previewConfig.fields = fields.map(field => ({
                label: field.label,
                key: field.name,
                type: field.type === 'image' ? 'image' : 'text',
                span: field.span || 1,
                row: field.row || 1
            }))

            // 将布局信息存储到组件数据中
            const currentData = selectedComponent.value.data || {}
            store.updateComponentData(
                selectedComponent.value.id,
                {
                    ...currentData,
                    fields: fields.map(field => ({
                        name: field.name,
                        label: field.label,
                        type: field.type,
                        span: field.span || 1,
                        row: field.row || 1,
                        value: currentData[field.name] || ''
                    }))
                }
            )
        }
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
                @layoutChange="handleLayoutChange"
            />
        </template>
        <div v-else class="h-full flex items-center justify-center text-gray-400 text-sm">
            请从组件市场选择一个组件进行编辑
        </div>
    </div>
</template>

<style scoped>

</style>