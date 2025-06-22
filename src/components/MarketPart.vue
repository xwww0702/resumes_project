<script lang="ts" setup>
import type { ResumeComponent } from '../type/Resume'
import CommonPreview from './preview/CommonPreview.vue'
// import { useComponentStore } from '../store/useComponentStore'
import componentConfigs from '../config/componentConfigs'
import { ref } from 'vue'
import { getComponentTemplateList } from '../service/request.ts'
import { onMounted } from 'vue'
const emit = defineEmits<{
    (e: 'select', component: ResumeComponent): void
}>()

// const store = useComponentStore()
const marketComponents = ref<ResumeComponent[]>([])

onMounted(async () => {
    // 1. 加载本地组件
    const localComponents = Object.entries(componentConfigs).map(([type, config], index) => ({
        id: `market-${index}`,
        type: type as ResumeComponent['type'],
        title: config.title,
        align: config.align || 'left',
        fields: config.defaultFields.map((field) => ({
            ...field,
            key: field.key || `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }))
    }))
    marketComponents.value = localComponents

    // 2. 加载用户自定义组件模板
    try {
        const response = await getComponentTemplateList()
        if (response.data.data && Array.isArray(response.data.data)) {
            const customComponents = response.data.data
                .filter((item: any) => item.config) // 确保组件有 config 属性
                .map((item: any) => {
                    return {
                        id: item._id,
                        type: 'user', // 自定义组件的类型
                        title: item.config.title,
                        fields: item.config.defaultFields.map((field: any) => ({
                            ...field,
                            // 确保每个字段都有唯一的key
                            key:
                                field.key ||
                                `user-field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                        })),
                        // 将原始配置存起来，以便拖拽时可以传递完整信息
                        template: item.config
                    }
                })
            marketComponents.value = [...marketComponents.value, ...customComponents]
            console.log(marketComponents.value,'marketComponents.value');
            // componentConfigsAll
        }
    } catch (error) {
        console.error('Failed to fetch custom component templates:', error)
    }
})

// 处理组件拖拽开始
const handleDragStart = (e: DragEvent, component: ResumeComponent) => {
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'copy'
        // 只传递必要的组件信息
        const componentData = {
            type: component.type,
            title: component.title,
            fields: component.fields,
            // 如果是自定义组件，把template也传过去
            ...(component.type === 'user' && { template: component.template })
        }
        e.dataTransfer.setData('component', JSON.stringify(componentData))
    }
}
</script>

<template>
    <div class="h-full flex flex-col pb-10">
        <div class="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            <div
                v-for="(component) in marketComponents"
                :key="component.id"
                class="cursor-move transition-transform duration-200 hover:-translate-y-1"
                draggable="true"
                @dragstart="(e) => handleDragStart(e, component)"
            >
                <CommonPreview 
                    v-if="(component.type !== 'image-left')&&(component.type !== 'image-right')"
                    :type="component.type"
                    :fields="component.fields"
                    class="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-200"
                />
                <ImagePreview
                    v-if="(component.type === 'image-left')||(component.type === 'image-right')"
                    :type="component.type"
                    :fields="component.fields"
                    class="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-200"
                    :align ='component.align'
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

.component-item {
    cursor: move;
    transition: transform 0.2s;
}

.component-item:hover {
    transform: translateY(-4px);
}

.preview-wrapper {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
}

.preview-wrapper:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style> 