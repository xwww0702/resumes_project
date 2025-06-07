<script lang="ts" setup>
import { computed, watch } from 'vue'
import type { ComponentData } from '../../type/Resume'
import { previewTemplates } from '../../config/previewTemplates'

const props = defineProps<{
    type: string
    data?: ComponentData
}>()

const previewTemplate = computed(() => {
    return previewTemplates[props.type] || {
        title: '',
        fields: []
    }
})

// 按行分组的字段，确保图片字段在最右边
const groupedFields = computed(() => {
    const groups: Record<number, typeof previewTemplate.value.fields> = {}
    
    // 首先按行分组
    previewTemplate.value.fields.forEach(field => {
        const row = field.row || 1
        if (!groups[row]) {
            groups[row] = []
        }
        groups[row].push({...field})
    })

    // 对每一行的字段进行排序，图片字段放在最后
    Object.values(groups).forEach(row => {
        row.sort((a, b) => {
            if (a.type === 'image' && b.type !== 'image') return 1
            if (a.type !== 'image' && b.type === 'image') return -1
            return 0
        })
    })

    return Object.values(groups)
})

// 监听模板变化
watch(() => previewTemplate.value.fields, () => {
    // 强制重新计算分组
    groupedFields.value
}, { deep: true })
</script>

<template>
    <div class="pl-3 pr-3 rounded-lg bg-white relative">
        <!-- 照片字段 -->
        <template v-for="field in previewTemplate.fields" :key="`field-${field.key}`">
            <div 
                v-if="field.type === 'image'" 
                class="photo-field"
            >
                <img 
                    v-if="data?.[field.key]" 
                    :src="data[field.key]" 
                    class="photo"
                    alt="个人照片"
                >
                <div v-else class="photo-placeholder">
                    未上传照片
                </div>
            </div>
        </template>

        <div class="mb-4 border-b border-gray-100 pb-1 mt-2">
            <h2 class="text-base font-medium text-gray-800 m-0">{{ previewTemplate.title }}</h2>
        </div>
        <div class="text-sm mb-2">
            <div 
                v-for="(row, rowIndex) in groupedFields" 
                :key="`row-${rowIndex}-${row.length}`"
                class="preview-row"
            >
                <template v-for="field in row" :key="`field-${field.key}-${field.row}-${field.span}`">
                    <!-- 文本字段 -->
                    <div 
                        v-if="field.type !== 'image'"
                        class="field-item"
                        :class="[`span-${field.span || 1}`]"
                    >
                        <span class="field-label">{{ field.label }}：</span>
                        <span class="field-value">
                            <template v-if="field.type === 'text'">
                                <div class="whitespace-pre-wrap leading-relaxed">{{ data?.[field.key] || '暂无内容' }}</div>
                            </template>
                            <template v-else>
                                {{ data?.[field.key] || '暂无内容' }}
                            </template>
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.preview-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 4px;
}

.preview-row:last-child {
    margin-bottom: 0;
}

.field-item {
    display: flex;
    align-items: flex-start;
    gap: 4px;
}

.field-item.span-1 {
    grid-column: span 1;
}

.field-item.span-2 {
    grid-column: span 2;
}

.field-item.span-3 {
    grid-column: span 3;
}

.field-label {
    color: #666;
    flex-shrink: 0;
    text-align-last: justify;
}

.field-value {
    flex: 1;
    min-width: 0;
}

.photo-field {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 4px;
    z-index: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.photo-field:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    color: #909399;
    font-size: 12px;
}
</style>