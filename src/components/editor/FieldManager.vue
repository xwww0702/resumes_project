<template>
    <div class="field-manager">
        <div class="field-list">
            <div v-for="(field, index) in fields" :key="field.key" class="field-item">
                <el-form-item :label="'字段 ' + (index + 1)">
                    <el-input v-model="field.label" placeholder="字段名称" />
                    <el-select v-model="field.type" placeholder="字段类型">
                        <el-option label="文本" value="text" />
                        <el-option label="多行文本" value="textarea" />
                        <el-option label="图片" value="image" />
                        <el-option label="日期" value="date" />
                        <el-option label="数字" value="number" />
                        <el-option label="列表" value="list" />
                    </el-select>
                    <el-input-number v-model="field.span" :min="1" :max="2" label="宽度" />
                    <el-input-number v-model="field.row" :min="1" :max="3" label="行数" />
                    <el-button type="danger" @click="removeField(index)">删除</el-button>
                </el-form-item>
            </div>
        </div>
        <el-button type="primary" @click="addField">添加字段</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ComponentField } from '../../type/Resume'

const props = defineProps<{
    modelValue: ComponentField[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: ComponentField[]): void
}>()

const fields = ref<ComponentField[]>(props.modelValue)

watch(fields, (newValue) => {
    emit('update:modelValue', newValue)
}, { deep: true })

const addField = () => {
    const newField: ComponentField = {
        key: `field${fields.value.length + 1}`,
        label: `field${fields.value.length + 1}`,
        type: 'text',
        span: 2,
        row: 1,
        placeholder: '请输入内容'
    }
    fields.value.push(newField)
}

const removeField = (index: number) => {
    fields.value.splice(index, 1)
}
</script>

<style scoped>
.field-manager {
    padding: 16px;
}

.field-list {
    margin-bottom: 16px;
}

.field-item {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;
}

.field-item .el-form-item {
    margin-bottom: 0;
}
</style> 