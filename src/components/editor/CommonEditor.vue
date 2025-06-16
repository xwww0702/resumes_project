<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { ResumeComponent, ComponentField } from '../../type/Resume'
// import  {useEditStore}  from '../../store/useEditStore'
import Layout from './Layout.vue'
import ContentEditer from './ContentEditer.vue';
import { Document, Edit } from '@element-plus/icons-vue'
import { useStyleChange } from '../../hooks/useStyleChange'

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

const { handleStyleChange, toggleBold, toggleItalic } = useStyleChange()

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
        <div class="editor-form">
            <div v-for="field in fieldsConfig" :key="field.key" class="field-item">
                <div class="field-header">
                    <span class="field-label">{{ field.label }}</span>
                    <div class="style-controls" v-if="field.type === 'text'">
                        <el-tooltip content="加粗">
                            <el-button 
                                :type="field.isBold ? 'primary' : 'default'"
                                size="small"
                                @click="toggleBold(field, fieldsConfig, emit)"
                            >
                                <el-icon>B</el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="斜体">
                            <el-button 
                                :type="field.isItalic ? 'primary' : 'default'"
                                size="small"
                                @click="toggleItalic(field, fieldsConfig, emit)"
                            >
                                <el-icon>I</el-icon>
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <el-input
                    v-if="field.type === 'text'"
                    v-model="field.value"
                    :placeholder="field.placeholder"
                    type="text"
                    @input="handleContentChange(fieldsConfig)"
                />
                <el-input
                    v-else-if="field.type === 'textarea'"
                    v-model="field.value"
                    :placeholder="field.placeholder"
                    type="textarea"
                    :rows="3"
                    @input="handleContentChange(fieldsConfig)"
                />
            </div>
        </div>
        <Layout 
            :type="component?.type"
            :fields-config="fieldsConfig"
            @layout-change="handleLayoutChange"
        />
    </div>
</template>

<style scoped>
.editor-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.editor-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
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