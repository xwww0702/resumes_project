<script setup lang='ts'>
import { Plus } from '@element-plus/icons-vue'
import type { ComponentField } from '../../type/Resume';
import type { FormInstance } from 'element-plus'

interface UploadFile {
    raw: File
    name: string
}

const props = defineProps<{
    formRef: { value: FormInstance | undefined },
    fieldsConfig: ComponentField[],
    formData: Record<string, any>
}>()

const emit = defineEmits<{
    (e: 'submit', data: ComponentField[]): void
}>()

// 处理输入变化
const handleInputChange = (field: ComponentField, value: string) => {
    props.formData[field.key] = value
    // 立即提交更新
    const updatedFields = props.fieldsConfig.map(f => {
        if (f.key === field.key) {
            return { ...f, value }
        }
        return f
    })
    emit('submit', updatedFields)
}

const submitForm = async () => {
    if (!props.formRef?.value) return
    await props.formRef.value.validate((valid: boolean) => {
        if (valid) {
            const updatedFields = props.fieldsConfig.map(field => ({
                ...field,
                value: props.formData[field.key] || ''
            }))
            emit('submit', updatedFields)
        }
    })
}

const handleImageSuccess = (field: ComponentField, response: any, uploadFile: UploadFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const result = e.target?.result
        if (result && typeof result === 'string') {
            props.formData[field.key] = result
            // 立即提交更新
            const updatedFields = props.fieldsConfig.map(f => {
                if (f.key === field.key) {
                    return { ...f, value: result }
                }
                return f
            })
            emit('submit', updatedFields)
        }
    }
    reader.readAsDataURL(uploadFile.raw)
}
</script>


<template>
            <div class="form-content">
                <h3 class="section-title text-sm font-medium text-gray-700 mb-3">内容编辑</h3>
                <div 
                    
                    class="form-row"
                >
                    <el-form-item
                    v-for="(config, index) in fieldsConfig" 
                        :key="config.key"
                        :label="config.label"
                        :prop="config.key"
                        :rules="config.rules"
                    >
                        <!-- 图片上传 -->
                        <template v-if="config.type === 'image'">
                            <el-upload
                                class="image-upload"
                                accept="image/*"
                                :auto-upload="false"
                                :show-file-list="false"
                                :on-change="(file: UploadFile) => handleImageSuccess(config, null, file)"
                            >
                                <img 
                                    v-if="formData[config.key]" 
                                    :src="formData[config.key]" 
                                    class="preview-image"
                                >
                                <el-icon v-else class="upload-icon"><Plus /></el-icon>
                            </el-upload>
                        </template>

                        <!-- 文本域 -->
                        <el-input
                            v-else-if="config.type === 'textarea'"
                            :model-value="formData[config.key]"
                            type="textarea"
                            :rows="3"
                            :placeholder="config.placeholder"
                            class="textarea-input"
                            @update:modelValue="(value: string) => handleInputChange(config, value)"
                        />

                        <!-- 普通输入框 -->
                        <el-input
                            v-else
                            :model-value="formData[config.key]"
                            :type="config.type"
                            :placeholder="config.placeholder"
                            class="text-input"
                            @update:modelValue="(value: string) => handleInputChange(config, value)"
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

</template>


<style>

</style>