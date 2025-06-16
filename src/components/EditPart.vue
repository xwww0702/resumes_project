<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { ComponentField } from '../type/Resume'
import componentConfigs from '../config/componentConfigs'
import { useComponentStore } from '../store/useComponentStore'
import { storeToRefs } from 'pinia'
import CommonEditor from './editor/CommonEditor.vue'

const store = useComponentStore()
const { selectedComponent } = storeToRefs(store)

// 获取当前组件的编辑器配置
const currentConfig = computed(() => {
    if (!selectedComponent.value) return null
    return componentConfigs[selectedComponent.value.type]
})


// 处理表单提交
const handleSubmit = (fields: ComponentField[]) => {
    if (selectedComponent.value) {
        // 确保保留所有字段属性，包括样式属性
        const updatedFields = fields.map(field => ({
            ...field,
            value: selectedComponent.value?.fields?.find(f => f.key === field.key)?.value || field.value || '',
            isBold: field.isBold || false,
            isItalic: field.isItalic || false
        }))
        
        store.updateComponent(selectedComponent.value.id, {
            fields: updatedFields
        })
    }
}

// 处理布局变更
const handleLayoutChange = (fields: ComponentField[]) => {
    if (selectedComponent.value) {
        // 确保保留所有字段属性
        const updatedFields = fields.map(field => ({
            ...field,
            value: selectedComponent.value?.fields?.find(f => f.key === field.key)?.value || field.value || ''
        }))
        
        store.updateComponent(selectedComponent.value.id, {
            fields: updatedFields
        })
    }
}

// 监听选中组件变化，确保字段值正确初始化
watch(selectedComponent, (newComponent) => {
    if (newComponent && currentConfig.value) {
        // 确保组件有所有必要的字段
        const existingFields = newComponent.fields || []
        const defaultFields = currentConfig.value.defaultFields
        
        // 合并现有字段和默认字段
        const mergedFields = defaultFields.map(defaultField => {
            const existingField = existingFields.find(f => f.key === defaultField.key)
            return {
                ...defaultField,
                ...existingField,
                value: existingField?.value || defaultField.value || ''
            }
        })
        
        // 更新组件字段
        store.updateComponent(newComponent.id, {
            fields: mergedFields
        })
    }
}, { immediate: true })


</script>

<!-- :config="editorConfig" -->
<template>
    <div class="edit-part">
        <div v-if="selectedComponent" class="edit-form">
            <CommonEditor
                :component="selectedComponent"
                @submit="handleSubmit"
                @layoutChange="handleLayoutChange"
            />
        </div>
        <div v-else class="no-selection">
            请选择一个组件进行编辑
        </div>
    </div>
</template>

<style scoped>
.edit-part {
    padding: 20px;
    height: 100%;
    overflow-y: auto;
}

.edit-form {
    max-width: 800px;
    margin: 0 auto;
}

.no-selection {
    text-align: center;
    color: #999;
    padding: 40px;
}
</style>