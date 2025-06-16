<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { ResumeComponent, ComponentField } from '../../type/Resume'
// import  {useEditStore}  from '../../store/useEditStore'
import Layout from './Layout.vue'
import ContentEditer from './ContentEditer.vue';

const props = defineProps<{
    component: ResumeComponent | null
}>()

const emit = defineEmits<{
    (e: 'submit', data: ComponentField[]): void
}>()

// const { fieldsConfig } = toRefs(useEditStore())
const fieldsConfig = ref<ComponentField[]>([])
const formData = ref<Record<string, any>>({})
const formRef = ref()

// 初始化字段配置
watch(() => props.component?.fields, (newFields) => {
    if (newFields) {
        fieldsConfig.value = newFields.map(field => ({
            ...field,
            row: field.row || 1,
            span: field.span || 1
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
    fieldsConfig.value = updatedFields
    emit('submit', updatedFields)
}

// 处理内容更新
const handleContentChange = (updatedFields: ComponentField[]) => {
    // 更新表单数据
    updatedFields.forEach(field => {
        formData.value[field.key] = field.value
    })
    // 更新字段配置
    fieldsConfig.value = updatedFields
    emit('submit', updatedFields)
}

</script>

<template>
    <div class="editor-container">
        <el-form
            ref="formRef"
            :model="formData"
            label-width="80px"
            class="editor-form"
        >
        <!-- v-if="(component?.type !== 'image-left')&&(component?.type !== 'image-right')" -->
            <Layout 
                :type = "component?.type"
                :fields-config="fieldsConfig" 
                @layout-change="handleLayoutChange" 
            />
            <ContentEditer
                :form-ref="{ value: formRef }"
                :fields-config="fieldsConfig"
                :form-data="formData"
                @submit="handleContentChange"
            />
        </el-form>
    </div>
</template>

<style scoped>
.editor-container {
    height: 100%;
    overflow-y: auto;
    padding: 20px;
}

.editor-form {
    max-width: 800px;
    margin: 0 auto;
}







/* 表单内容区域样式 */
.form-content {
    background-color: white;
    border-radius: 6px;
    padding: 16px;
    margin-top: 16px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 16px;
}

.form-item {
    margin-bottom: 0;
}

.form-item.span-1 {
    grid-column: span 1;
}

.form-item.span-2 {
    grid-column: span 2;
}

.form-item.span-3 {
    grid-column: span 3;
}

/* 图片上传样式 */
.image-upload {
    width: 100px;
    height: 100px;
    border: 1px dashed #d1d5db;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.image-upload:hover {
    border-color: #3b82f6;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.upload-icon {
    font-size: 24px;
    color: #9ca3af;
}

/* 输入框样式 */
.textarea-input :deep(.el-textarea__inner),
.text-input :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #e5e7eb;
}

.textarea-input :deep(.el-textarea__inner:hover),
.text-input :deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px #d1d5db;
}

.textarea-input :deep(.el-textarea__inner:focus),
.text-input :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #3b82f6;
}

/* 提交按钮样式 */
.submit-container {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
}

.submit-button {
    min-width: 96px;
}
</style> 