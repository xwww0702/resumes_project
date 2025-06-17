<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ComponentField } from '../../type/Resume'
import { useStyleChange } from '../../hooks/useStyleChange'
import ImageEditor from './ImageEditor.vue'

const props = defineProps<{
    fieldsConfig: ComponentField[]
}>()

const emit = defineEmits<{
    (e: 'submit', data: ComponentField[]): void
}>()

const { toggleBold, toggleItalic, toggleListStyle } = useStyleChange()

const handleContentChange = (fieldsConfig: ComponentField[]) => {
    emit('submit', fieldsConfig)
}

const handleImageUpdate = (field: ComponentField, value: string) => {
    field.value = value
    emit('submit', props.fieldsConfig)
}

</script>

<template>
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
                    <el-tooltip :content="field.listStyle === 'disc' ? '圆点' : field.listStyle === 'decimal' ? '序号' : '无样式'">
                        <el-button 
                            :type="field.listStyle === 'none' ? 'default' : 'primary'"
                            size="small"
                            @click="toggleListStyle(field, fieldsConfig, emit)"
                        >
                        <el-icon><Brush /></el-icon>
                        </el-button>
                    </el-tooltip>
                </div>
            </div>
            <template v-if="field.type === 'image'">
                <ImageEditor
                    :field="field"
                    :value="field.value || ''"
                    @update="(value) => handleImageUpdate(field, value)"
                />
            </template>
            <template v-else>
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
            </template>
        </div>
    </div>
</template>

<style scoped>
.editor-form {
    padding: 16px;
}

.field-item {
    margin-bottom: 16px;
}

.field-item:last-child {
    margin-bottom: 0;
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.field-label {
    font-size: 14px;
    color: #606266;
}

.style-controls {
    display: flex;
    gap: 4px;
}

:deep(.el-button) {
    padding: 4px 8px;
}

:deep(.el-button .el-icon) {
    font-style: normal;
    font-weight: bold;
}
</style> 