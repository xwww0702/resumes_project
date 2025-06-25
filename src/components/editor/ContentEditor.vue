<script lang="ts" setup>
import type { ComponentField } from '../../type/Resume'
import { useStyleChange } from '../../hooks/useStyleChange'
import ImageEditor from './ImageEditor.vue'
import  Brush  from '../icons/Brush.vue'

const props = defineProps<{
    fieldsConfig: ComponentField[],
    border:boolean
}>()
console.log(props.fieldsConfig,'fieldsConfig');

const emit = defineEmits<{
    (e: 'submit', data: ComponentField[]): void,
    (e:'update:border',data:boolean):void
}>()

const { toggleBold, toggleItalic, toggleListStyle } = useStyleChange()

// Helper for safely getting/setting start/end for time fields
function getTimeValue(field: ComponentField, key: 'start' | 'end') {
    if (typeof field.value === 'object' && field.value !== null && key in field.value) {
        return (field.value as Record<string, any>)[key]
    }
    return ''
}
function setTimeValue(field: ComponentField, key: 'start' | 'end', val: string) {
    if (typeof field.value !== 'object' || field.value === null) {
        field.value = { start: '', end: '' }
    }
    (field.value as Record<string, any>)[key] = val
}

const handleContentChange = (fieldsConfig: ComponentField[]) => {
    emit('submit', fieldsConfig)
}

const handleImageUpdate = (field: ComponentField, value: string) => {
    field.value = value
    emit('submit', props.fieldsConfig)
}


</script>

<template>
    <div>
        <el-switch
            :model-value = 'border'
            @change="(val:boolean) => $emit('update:border', val)"
            active-text="显示下边框"
            inactive-text="隐藏下边框"
            class="mb-4"
        />
        <div class="editor-form" :class="{ 'border-b': border }">
            <div v-for="(field) in fieldsConfig" :key="field.key" class="field-item">
                <div class="field-header">
                    <span class="field-label">{{ field.label }}</span>
                    <div class="style-controls" v-if="field.type === 'text' || field.type === 'textarea'">
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
                        <el-tooltip :content="field.listStyle === 'disc' ? '圆点列表' :  '无列表样式'">
                            <el-button 
                                :type="field.listStyle === 'none' ? 'default' : 'primary'"
                                size="small"
                                @click="toggleListStyle(field, fieldsConfig, emit)"
                            >
                                <el-icon v-if="field.listStyle === 'disc'">●</el-icon>
                                <el-icon v-else><Brush /></el-icon>
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <template v-if="field.type === 'image'">
                    <ImageEditor
                        :field="field"
                        :value="typeof field.value === 'string' ? field.value : ''"
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
                    <div v-else-if="field.type === 'time'" class="flex items-center space-x-2">
                        <el-date-picker
                            :model-value="getTimeValue(field, 'start')"
                            @update:model-value="(val: string) => { setTimeValue(field, 'start', val); handleContentChange(fieldsConfig) }"
                            type="month"
                            placeholder="开始月份"
                            format="YYYY-MM"
                            value-format="YYYY-MM"
                            class="flex-1"
                        />
                        <span>———</span>
                        <el-date-picker
                            :model-value="getTimeValue(field, 'end')"
                            @update:model-value="(val: string) => { setTimeValue(field, 'end', val); handleContentChange(fieldsConfig) }"
                            type="month"
                            placeholder="结束月份"
                            format="YYYY-MM"
                            value-format="YYYY-MM"
                            class="flex-1"
                        />
                    </div>
                </template>
            </div>
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