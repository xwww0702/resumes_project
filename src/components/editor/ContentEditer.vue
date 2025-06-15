<script setup lang='ts'>
import type { ComponentField } from '../../type/Resume';
import type { FormInstance } from 'element-plus'
import ImageEditor from './ImageEditor.vue'


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

// 处理图片更新
const handleImageUpdate = (field: ComponentField, value: string, alignment?: 'left' | 'right') => {
    props.formData[field.key] = value
    const updatedFields = props.fieldsConfig.map(f => {
        if (f.key === field.key) {
            return { 
                ...f, 
                value,
                alignment: alignment || f.alignment || 'left'
            }
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
                        <template v-if="config.type === 'image'">
                            <ImageEditor
                                :field="config"
                                :value="formData[config.key]"
                                @update="(value: string) => handleImageUpdate(config, value)"
                                @update:alignment="(alignment: 'left' | 'right') => handleImageUpdate(config, formData[config.key], alignment)"
                            />
                        </template>

                        <el-input
                            v-else-if="config.type === 'textarea'"
                            :model-value="formData[config.key]"
                            type="textarea"
                            :rows="3"
                            :placeholder="config.placeholder"
                            class="textarea-input"
                            @update:modelValue="(value: string) => handleInputChange(config, value)"
                        />

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