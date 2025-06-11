<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { ResumeComponent, ComponentField } from '../../type/Resume'
import { Plus, InfoFilled } from '@element-plus/icons-vue'


interface UploadFile {
    raw: File
    name: string
}

const props = defineProps<{
    component: ResumeComponent | null
}>()

const emit = defineEmits<{
    (e: 'submit', data: any): void
    (e: 'layoutChange', fields: ComponentField[]): void
}>()

const formData = ref<Record<string, any>>({})
const formRef = ref()
const fieldsConfig = ref<ComponentField[]>([])

// 初始化字段配置
watch(() => props.component?.fields, (newFields) => {
    if (newFields) {
        fieldsConfig.value = newFields.map(field => ({
            ...field,
            row: field.row || 1,
            span: field.span || 1
        }))
        console.log('Fields initialized:', fieldsConfig.value)
    } else {
        fieldsConfig.value = []
    }
}, { immediate: true, deep: true })

// 按行分组的字段
const groupedFields = computed(() => {
    const groups: Record<number, ComponentField[]> = {}
    fieldsConfig.value.forEach(field => {
        const row = field.row || 1
        if (!groups[row]) {
            groups[row] = []
        }
        groups[row].push(field)
    })
    return Object.values(groups)
})

// 重置表单数据
const resetForm = () => {
    if (props.component?.fields) {
        const fieldValues: Record<string, any> = {}
        props.component.fields.forEach(field => {
            fieldValues[field.key] = field.value || ''
        })
        formData.value = fieldValues
    } else {
        formData.value = {}
    }
}

// 监听组件变化，重置表单
watch(() => props.component, () => {
    resetForm()
}, { immediate: true })

// 监听组件字段变化
watch(() => props.component?.fields, () => {
    resetForm()
}, { deep: true })

// 处理布局更新
const handleLayoutChange = (field: ComponentField, key: 'row' | 'span', value: number) => {
    console.log('Layout change:', field.key, key, value)
    const fieldToUpdate = fieldsConfig.value.find(f => f.key === field.key)
    if (fieldToUpdate) {
        fieldToUpdate[key] = value
        // 确保更新后的字段配置被正确传递
        emit('layoutChange', [...fieldsConfig.value])
    }
}

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid: boolean) => {
        if (valid) {
            // 合并表单数据和布局信息
            const submitData = fieldsConfig.value.map(field => ({
                ...field,  // 包含所有字段属性（包括 row 和 span）
                value: formData.value[field.key] || ''
            }))
            console.log('Submitting data:', submitData)
            emit('submit', submitData)
        }
    })
}

const handleImageSuccess = (field: ComponentField, response: any, uploadFile: UploadFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        if (e.target?.result) {
            formData.value[field.key] = e.target.result
        }
    }
    reader.readAsDataURL(uploadFile.raw)
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
            <!-- 布局设置区域 -->
            <div class="layout-settings mb-4">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="section-title text-sm font-medium text-gray-700 m-0">布局设置</h3>
                    <el-tooltip content="调整字段的行号和跨列数来自定义布局" placement="top">
                        <el-icon class="text-gray-400 cursor-help"><InfoFilled /></el-icon>
                    </el-tooltip>
                </div>
                <div class="layout-grid">
                    <div v-for="field in fieldsConfig" :key="field.key" class="layout-item">
                        <div class="field-label text-xs text-gray-600">{{ field.label }}</div>
                        <div class="field-controls">
                            <div class="control-group">
                                <label class="text-xs text-gray-500">行号</label>
                                <el-input-number 
                                    v-model="field.row" 
                                    :min="1" 
                                    :max="10"
                                    size="small"
                                    controls-position="right"
                                    style="width: 100px"
                                    class="compact-number"
                                    @update:modelValue="(value: number) => handleLayoutChange(field, 'row', value)"
                                />
                            </div>
                            <div class="control-group">
                                <label class="text-xs text-gray-500">跨列</label>
                                <el-input-number 
                                    v-model="field.span" 
                                    :min="1" 
                                    :max="3"
                                    size="small"
                                    controls-position="right"
                                    style="width: 100px"
                                    class="compact-number"
                                    @update:modelValue="(value: number) => handleLayoutChange(field, 'span', value)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 表单区域 -->
            <div class="form-content">
                <h3 class="section-title text-sm font-medium text-gray-700 mb-3">内容编辑</h3>
                <div 
                    v-for="(row, rowIndex) in groupedFields" 
                    :key="rowIndex"
                    class="form-row"
                >
                    <el-form-item
                        v-for="field in row"
                        :key="field.key"
                        :label="field.label"
                        :prop="field.key"
                        :rules="field.rules"
                        :class="[
                            'form-item',
                            `span-${field.span || 1}`
                        ]"
                    >
                        <!-- 图片上传 -->
                        <template v-if="field.type === 'image'">
                            <el-upload
                                class="image-upload"
                                accept="image/*"
                                :auto-upload="false"
                                :show-file-list="false"
                                :on-change="(file: UploadFile) => handleImageSuccess(field, null, file)"
                            >
                                <img 
                                    v-if="formData[field.key]" 
                                    :src="formData[field.key]" 
                                    class="preview-image"
                                >
                                <el-icon v-else class="upload-icon"><Plus /></el-icon>
                            </el-upload>
                        </template>

                        <!-- 文本域 -->
                        <el-input
                            v-else-if="field.type === 'textarea'"
                            v-model="formData[field.key]"
                            type="textarea"
                            :rows="3"
                            :placeholder="field.placeholder"
                            class="textarea-input"
                        />

                        <!-- 普通输入框 -->
                        <el-input
                            v-else
                            v-model="formData[field.key]"
                            :type="field.type"
                            :placeholder="field.placeholder"
                            class="text-input"
                        />
                    </el-form-item>
                </div>

                <el-form-item class="submit-container">
                    <el-button 
                        type="primary" 
                        @click="submitForm"
                        class="submit-button"
                    >保存</el-button>
                </el-form-item>
            </div>
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

/* 布局设置区域样式 */
.layout-settings {
    background-color: #f8fafc;
    border-radius: 6px;
    padding: 12px;
}

.layout-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.layout-item {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: 8px;
    display: flex;
    align-items: center;
}

.field-label {
    font-weight: 500;
    width: 80px;
    text-align: left;
    font-size: 13px;
    color: #4b5563;
    padding-left: 4px;
}

.field-controls {
    display: flex;
    gap: 12px;
    flex: 1;
}

.control-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.control-group label {
    font-size: 12px;
    color: #6b7280;
    width: 32px;
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
    grid-template-columns: repeat(3, 1fr);
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