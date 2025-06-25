<template>
    <div class="field-manager mb-5">
        <div class="field-list">
            <div v-for="(field, index) in defaultFields" :key="field.key" class="field-item">
                <el-form-item :label="'字段 ' + (index + 1)">
                    <div class="field-controls">
                        <div class="field-row">
                            <span class="field-label">字段名称</span>
                            <el-input v-model="field.label" placeholder="字段名称" class="field-input" />
                        </div>
                        <div class="field-row">
                            <span class="field-label">字段类型</span>
                            <el-select v-model="field.type" placeholder="字段类型" class="field-input">
                                <el-option label="文本" value="text" />
                                <el-option label="多行文本" value="textarea" />
                                <!-- <el-option label="图片" value="image" /> -->
                                <el-option label="日期" value="date" />
                                <el-option label="数字" value="number" />
                                <el-option label="列表" value="list" />
                            </el-select>
                        </div>
                        <div class="field-row">
                            <span class="field-label">宽度</span>
                            <el-input-number v-model="field.span" :min="1" :max="2" class="field-input" />
                        </div>
                        <div class="field-row">
                            <span class="field-label">行数</span>
                            <el-input-number v-model="field.row" :min="1" :max="3" class="field-input" />
                        </div>
                        <!-- <el-input v-model="field.placeholder" placeholder="占位文本" class="field-placeholder" /> -->
                        <el-button type="danger" @click="removeField(index)" class="field-remove">删除</el-button>
                    </div>
                </el-form-item>
            </div>
        </div>
        <el-button type="primary" @click="addField" class="add-field-btn">添加字段</el-button>
        <!-- <el-button type="primary" @click="saveField" class="add-field-btn">保存至组件市场</el-button> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentField } from '../../type/Resume'
// import { saveComponentTemplate } from '../../service/request'

// const props = defineProps<{
//     modelValue: ComponentField[]
// }>()

// const emit = defineEmits<{
//     (e: 'update:modelValue', value: ComponentField[]): void
// }>()

const defaultFields = ref<ComponentField[]>([])
// watch(
//   () => props.modelValue,
//   (newVal) => {
//     fields.value = [...newVal]
//   },
//   { deep: true }
// )
// watch(fields, (newValue) => {
//     emit('update:modelValue', newValue)
// }, { deep: true })

const addField = () => {
    const newField: ComponentField = {
        key: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        label: `字段${defaultFields.value.length + 1}`,
        type: 'text',
        span: 2,
        row: 1,
        placeholder: '请输入内容',
        value: ''
    }
    defaultFields.value.push(newField)
}

const removeField = (index: number) => {
    defaultFields.value.splice(index, 1)
}
// const saveField = async () => {
//   try {
//     await saveComponentTemplate({
        
//         defaultFields:defaultFields.value,
//         type:'user',
//         title:'userConfig',
    
    
//     })
//     ElMessage.success('保存成功')
//     defaultFields.value = []
//   } catch (e) {
//     ElMessage.error('保存失败')
//   }
// }
</script>

<style scoped>
.field-manager {
    padding: 16px;
}

.field-list {
    margin-bottom: 16px;
}

.field-item {
    margin-bottom: 16px;
    padding: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #f5f7fa;
}

.field-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 8px;
    align-items: start;
}

.field-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.field-label {
    min-width: 60px;
    margin-right: 8px;
    color: #606266;
    font-size: 14px;
}

.field-input {
    flex: 1;
}

.field-remove {
    grid-column: span 1;
    justify-self: end;
}

.add-field-btn {
    width: 30%;
    margin-top: 5px;
}

:deep(.el-form-item__label) {
    font-weight: 500;
    color: #606266;
}

:deep(.el-input-number) {
    width: 100%;
}
</style> 