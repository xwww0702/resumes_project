<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ResumeComponent, ComponentField } from '../../type/Resume'
import Layout from './Layout.vue'
import ContentEditor from './ContentEditor.vue'
import { useComponentStore } from '../../store/useComponentStore';

const props = defineProps<{
    component: ResumeComponent | null
}>()

const emit = defineEmits<{
    (e: 'submit', data: ComponentField[]): void
}>()

const fieldsConfig = ref<ComponentField[]>([])
const formData = ref<Record<string, any>>({})
const {updateComponentBorder} = useComponentStore()

// 初始化字段配置
watch(() => props.component?.fields, (newFields) => {
    if (newFields) {
        fieldsConfig.value = newFields.map(field => ({
            ...field,
            row: field.row || 1,
            span: field.span || 1,
            listStyle: field.listStyle || 'none'
        }))
        // 初始化表单数据
        formData.value = newFields.reduce((acc, field) => {
            acc[field.key] = field.value || ''
            return acc
        }, {} as Record<string, any>)
    } else {
        fieldsConfig.value = []
        formData.value = {}
    }
}, { immediate: true, deep: true })

// 处理布局更新
const handleLayoutChange = (updatedFields: ComponentField[]) => {
    emit('submit', updatedFields)
}

// 处理内容更新
const handleContentChange = (fieldsConfig: ComponentField[]) => {
    emit('submit', fieldsConfig)
}

const handleBorder = (val:boolean)=>{
    if (props.component?.id) {
        updateComponentBorder(props.component.id, val)
    }
    
}

</script>

<template>
    <div class="editor-container mb-10">
        <div class="editor-form">
            <!-- <FieldManager :modelValue="fieldsConfig"/> -->
            <Layout 
            :type="component?.type || ''"
            :fields-config="fieldsConfig"
            @layout-change="handleLayoutChange"
        />
            <ContentEditor 
                :border="component?.border||false"
                :fieldsConfig="fieldsConfig"
                @submit="handleContentChange"
                @update:border="handleBorder"
            />
        </div>

       
        
    </div>
</template>

<style scoped>
.editor-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.editor-form {
    padding: 16px;
}

.field-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.field-label {
    font-size: 14px;
    color: #374151;
    font-weight: 500;
}

.style-controls {
    display: flex;
    gap: 8px;
    align-items: center;
}

:deep(.el-button) {
    padding: 4px 8px;
    font-weight: bold;
}

:deep(.el-button[type="primary"]) {
    background-color: #409eff;
    border-color: #409eff;
}

:deep(.el-icon) {
    font-size: 14px;
}
</style> 