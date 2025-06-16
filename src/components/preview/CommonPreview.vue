<script lang="ts" setup>
import { computed } from 'vue'
import type { ResumeComponentType, ComponentField } from '../../type/Resume'

const props = defineProps<{
    type: ResumeComponentType
    fields?: ComponentField[]
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
    <div class="pl-3 pr-3 rounded-lg bg-white relative">
        <div class="text-sm">
            <template v-for="(row, rowIndex) in groupedFields" :key="`row-${rowIndex}-${row.length}`">
                <div class="preview-row">
                    <template v-for="field in row" :key="`field-${field.key}-${field.row}-${field.span}`">
                        <div 
                            class="field-item"
                            :class="[`span-${field.span || 1}`]"
                        >
                            <span class="field-value">
                                <template v-if="field.type === 'text'">
                                    <div class="whitespace-pre-wrap leading-relaxed">{{ field.value || field.placeholder }}</div>
                                </template>
                                <template v-if="field.type === 'textarea'">
                                    <div class="whitespace-pre-wrap leading-relaxed">{{ field.value || field.placeholder }}</div>
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