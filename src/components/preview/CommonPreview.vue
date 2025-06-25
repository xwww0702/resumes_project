<script lang="ts" setup>
import { computed } from 'vue'
import type { ResumeComponentType, ComponentField } from '../../type/Resume'

const props = defineProps<{
    type: ResumeComponentType
    fields?: ComponentField[]
    border:boolean
    showLabel?: boolean
}>()

const groupedFields = computed(() => {
    const groups: Record<number, ComponentField[]> = {}
    const fields = props.fields || []
    
    fields.forEach(field => {
        const row = field.row || 1
        if (!groups[row]) {
            groups[row] = []
        }
        groups[row].push({...field})
    })

    return Object.values(groups)
})
</script>

<template>
    <div class="pl-3 pr-3  bg-white relative" :class="props.border?'border-b border-gray-200':''">
        <div class="text-sm">
            <template v-for="(row, _rowIndex) in groupedFields" :key="`row-${_rowIndex}-${row.length}`">
                <div class="preview-row">
                    <template v-for="field in row" :key="`field-${field.key}-${field.row}-${field.span}`">
                        <div 
                            class="field-item"
                            :class="[`span-${field.span || 1}`]"
                        >
                            <span class="flex-1 min-w-0 text-gray-700 text-sm leading-relaxed">
                                <span v-if="props.showLabel !== false" class="field-label mr-1">{{ field.label }}</span>
                                <template v-if="field.type === 'text' && field.listStyle == 'disc'">
                                    <ul class='list-disc ml-4'>
                                        <li class="whitespace-pre-wrap leading-relaxed text-gray-800"
                                            :class="{
                                                'font-bold': field.isBold,
                                                'italic': field.isItalic
                                            }"
                                        >
                                            {{ field.value || field.placeholder}}
                                        </li>
                                    </ul>
                                </template>
                                <template v-else-if="field.type === 'text'">
                                    <div 
                                        class="whitespace-pre-wrap leading-relaxed text-gray-800"
                                        :class="{
                                            'font-bold': field.isBold,
                                            'italic': field.isItalic
                                        }"
                                    >
                                        {{ field.value || field.placeholder}}
                                    </div>
                                </template>
                                <template v-else-if="field.type === 'textarea' && field.listStyle !== 'none'">
                                    <ul :class="{
                                        'list-disc ml-4': field.listStyle === 'disc',
                                        'list-decimal ml-4': field.listStyle === 'decimal'
                                    }" >
                                        <li class="whitespace-pre-wrap leading-relaxed text-gray-800"
                                            :class="{
                                                'font-bold': field.isBold,
                                                'italic': field.isItalic
                                            }"
                                        >
                                            {{ field.value || field.placeholder}}
                                        </li>
                                    </ul>
                                </template>
                                <template v-else-if="field.type === 'textarea'">
                                    <div 
                                        class="whitespace-pre-wrap leading-relaxed text-gray-800"
                                        :class="{
                                            'font-bold': field.isBold,
                                            'italic': field.isItalic
                                        }"
                                    >
                                        {{ field.value || field.placeholder}}
                                    </div>
                                </template>
                                <template v-else-if="field.type === 'time'">
                                    <div class="whitespace-pre-wrap leading-relaxed">
                                        <template v-if="typeof field.value === 'object' && field.value !== null && ('start' in field.value || 'end' in field.value)">
                                            <span>{{ ('start' in field.value ? (field.value as Record<string, any>).start : field.placeholder) }}</span>
                                            <span v-if="('start' in field.value && 'end' in field.value && (field.value as Record<string, any>).start && (field.value as Record<string, any>).end)"> — </span>
                                            <span>{{ ('end' in field.value ? (field.value as Record<string, any>).end : '') }}</span>
                                        </template>
                                        <template v-else>
                                            {{ field.placeholder }}
                                        </template>
                                    </div>
                                </template>
                            </span>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.preview-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 2px;
}

.preview-row:last-child {
    margin-bottom: 0;
}

.field-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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

.field-value {
    flex: 1;
    min-width: 0;
    color: #333;
    line-height: 1.5;
    
}
</style>