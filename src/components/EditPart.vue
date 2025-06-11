<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { ComponentField } from '../type/Resume'
import componentConfigs from '../config/componentConfigs'
import { useComponentStore } from '../store/useComponentStore'
import { storeToRefs } from 'pinia'
import FieldManager from './editor/FieldManager.vue'

const store = useComponentStore()
const { selectedComponent } = storeToRefs(store)

const formData = ref({
    title: '',
    fields: [] as ComponentField[]
})

// 获取当前组件的编辑器配置
const currentConfig = computed(() => {
    if (!selectedComponent.value) return null
    return componentConfigs[selectedComponent.value.type]
})

// 监听选中组件变化
watch(selectedComponent, (newComponent) => {
    if (newComponent) {
        formData.value = {
            title: newComponent.data?.title || '',
            fields: [...(newComponent.fields || [])]
        }
    } else {
        formData.value = {
            title: '',
            fields: []
        }
    }
}, { immediate: true })

// 处理标题变更
const handleTitleChange = (newTitle: string) => {
    if (selectedComponent.value) {
        store.updateComponent(selectedComponent.value.id, {
            data: {
                ...selectedComponent.value.data,
                title: newTitle
            }
        })
    }
}

// 处理字段变更
const handleFieldsChange = (newFields: ComponentField[]) => {
    if (selectedComponent.value) {
        store.updateComponent(selectedComponent.value.id, {
            fields: newFields
        })
    }
}
</script>

<template>
    <div class="edit-part">
        <div v-if="selectedComponent" class="edit-form">
            <el-form :model="formData" label-width="80px">
                <el-form-item label="标题">
                    <el-input 
                        v-model="formData.title" 
                        @update:modelValue="handleTitleChange"
                    />
                </el-form-item>
                <el-form-item label="字段管理">
                    <FieldManager 
                        v-model="formData.fields" 
                        @update:modelValue="handleFieldsChange"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div v-else class="no-selection">
            请选择一个组件进行编辑
        </div>
    </div>
</template>

<style scoped>
.edit-part {
    padding: 20px;
    height: 100%;
    overflow-y: auto;
}

.edit-form {
    max-width: 800px;
    margin: 0 auto;
}

.no-selection {
    text-align: center;
    color: #999;
    padding: 40px;
}
</style>