<script setup lang='ts' >
import type { ComponentField } from '../../type/Resume'
import { InfoFilled } from '@element-plus/icons-vue'

const props = defineProps<{
    fieldsConfig: ComponentField[]
    type:string
}>()

const emit = defineEmits<{
    (e: 'layoutChange', fields: ComponentField[]): void
}>()

const handleLayoutChange = (field: ComponentField, key: 'row' | 'span', value: number) => {
    const updatedFields = props.fieldsConfig.map(f => {
        if (f.key === field.key) {
            return { ...f, [key]: value }
        }
        return f
    })
    emit('layoutChange', updatedFields)
}
</script>


<template>
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
                            <div class="control-group" v-if="(type !== 'image-left')&&(type !== 'image-right')">
                                <label class="text-xs text-gray-500">行号</label>
                                <el-input-number 
                                    :model-value="field.row"
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
                                    :model-value="field.span"
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

</template>


<style>
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

</style>