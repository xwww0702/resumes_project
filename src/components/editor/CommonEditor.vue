<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ResumeComponent } from '../../type/Resume'

interface FormField {
    name: string
    label: string
    type: 'text' | 'number' | 'email' | 'textarea'
    placeholder?: string
    rules?: any[]
}

interface EditorConfig {
    fields: FormField[]
}

const props = defineProps<{
    component: ResumeComponent | null
    config: EditorConfig
}>()

const emit = defineEmits<{
    (e: 'submit', data: any): void
}>()

const formData = ref<Record<string, any>>({})
const formRef = ref()

// 重置表单数据
const resetForm = () => {
    if (props.component?.data) {
        // 如果组件有数据，使用组件数据初始化表单
        formData.value = { ...props.component.data }
    } else {
        // 否则使用空值初始化
        formData.value = {}
        props.config.fields.forEach(field => {
            formData.value[field.name] = ''
        })
    }
}

// 监听组件变化，重置表单
watch(() => props.component, () => {
    resetForm()
}, { immediate: true })

// 监听组件数据变化
watch(() => props.component?.data, () => {
    resetForm()
}, { deep: true })

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid: boolean) => {
        if (valid) {
            emit('submit', formData.value)
        }
    })
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
            <el-form-item
                v-for="field in config.fields"
                :key="field.name"
                :label="field.label"
                :prop="field.name"
                :rules="field.rules"
                class="form-item"
            >
                <el-input
                    v-if="field.type === 'textarea'"
                    v-model="formData[field.name]"
                    type="textarea"
                    :rows="3"
                    :placeholder="field.placeholder"
                    class="textarea-input"
                ></el-input>
                <el-input
                    v-else
                    v-model="formData[field.name]"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    class="text-input "
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button 
                    type="primary" 
                    @click="submitForm"
                    class="submit-button"
                >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.editor-container {
    padding: 24px;
}

.editor-form {
    max-width: 36rem;
}

.form-item {
    margin-bottom: 24px;
}

.form-item:last-of-type {
    margin-bottom: 32px;
}

.textarea-input :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.textarea-input :deep(.el-textarea__inner:hover) {
    box-shadow: 0 0 0 1px #c0c4cc inset;
}

.textarea-input :deep(.el-textarea__inner:focus) {
    box-shadow: 0 0 0 1px #409eff inset;
}

.text-input :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.text-input :deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px #c0c4cc inset;
}

.text-input :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #409eff inset;
}

.submit-button {
    width: 96px;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
}
</style> 