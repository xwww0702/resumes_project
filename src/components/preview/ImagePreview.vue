<script lang="ts" setup>
import { computed } from 'vue'
import type { ComponentField, ResumeComponentType } from '../../type/Resume'

const props = defineProps<{
    type: ResumeComponentType
    fields?: ComponentField[]
    align: string
}>()

const imageField = computed(() => {
    return props.fields?.find(field => field.type === 'image')
})

const textFields = computed(() => {
    return props.fields?.filter(field => field.type !== 'image') || []
})

const getImageAlignment = (field: ComponentField | undefined) => {
    return props.align || 'left'
}

const getMaxRow = () => {
    return Math.max(...(textFields.value.map(field => field.row || 1)))
}

const getFieldsByRow = (row: number) => {
    return textFields.value.filter(field => (field.row || 1) === row)
}
</script>

<template>
    <div class="relative min-h-[140px] p-0 border-b border-gray-200">
        <div 
            v-if="imageField"
            class="absolute top-0 w-[90px] h-[120px] overflow-hidden rounded shadow-sm transition-all duration-200 bg-gray-50 hover:shadow z-10"
            :class="getImageAlignment(imageField) === 'right' ? 'right-4' : 'left-4'"
        >
            <img 
                v-if="imageField.value" 
                :src="imageField.value" 
                class="w-full h-full object-cover rounded"
                alt="个人照片"
            >
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-xs rounded p-2 text-center leading-relaxed">
                {{ imageField.placeholder || '请上传照片' }}
            </div>
        </div>

        <div 
            class="absolute bottom-4"
            :class="getImageAlignment(imageField) === 'right' ? 'left-4 right-[140px]' : 'left-[140px] right-4'"
        >
            <div 
                v-for="row in getMaxRow()" 
                :key="`row-${row}`"
                class="grid grid-cols-3 gap-3 mb-3 last:mb-0"
            >
                <template v-for="field in getFieldsByRow(row)" :key="`${type}-field-${field.key}`">
                    <div 
                        class="flex items-start min-h-6 py-0.5"
                        :class="{
                            'col-span-1': field.span === 1,
                            'col-span-2': field.span === 2,
                            'col-span-3': field.span === 3
                        }"
                    >
                        <span class="flex-1 min-w-0 text-gray-700 text-sm leading-relaxed">
                            <template v-if="field.type === 'text'">
                                <div class="whitespace-pre-wrap break-words leading-7 text-gray-800">
                                    {{ field.label }}：{{ field.value || ''}}
                                </div>
                            </template>
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-preview {
    position: relative;
    min-height: 120px;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
}

.photo-field {
    position: absolute;
    top: 12px;
    width: 90px;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
    z-index: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    background-color: #f9fafb;
}

.photo-field.right-0 {
    right: 16px;
}

.photo-field.left-0 {
    left: 16px;
}

.photo-field:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    color: #6b7280;
    font-size: 12px;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
    line-height: 1.4;
}

.text-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-left: 122px;
    margin-right: 16px;
}

.text-field {
    display: flex;
    align-items: flex-start;
    min-height: 24px;
    padding: 2px 0;
}

.text-field.span-1 {
    grid-column: span 1;
}

.text-field.span-2 {
    grid-column: span 2;
}

.text-field.span-3 {
    grid-column: span 3;
}

.text-field.textarea-field {
    min-height: 60px;
}

.field-value {
    flex: 1;
    min-width: 0;
    color: #374151;
    line-height: 1.6;
    font-size: 14px;
}

.text-field-content {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.8;
    color: #1f2937;
}

.textarea-content {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.8;
    color: #1f2937;
    font-size: 13px;
    padding: 4px 0;
}
</style>