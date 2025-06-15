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

    Object.values(groups).forEach(row => {
        row.sort((a, b) => {
            if (a.type === 'image' && b.type !== 'image') return 1
            if (a.type !== 'image' && b.type === 'image') return -1
            return 0
        })
    })

    return Object.values(groups)
})

const getImageAlignment = (field: ComponentField) => {
    return field.alignment || 'left'
}
</script>

<template>
    <div class="pl-3 pr-3 rounded-lg bg-white relative">
        <template v-for="field in fields" :key="`field-${field.key}`">
            <div 
                v-if="field.type === 'image'" 
                class="photo-field"
                :class="getImageAlignment(field) === 'right' ? 'right-0' : 'left-0'"
            >
                <img 
                    v-if="field.value" 
                    :src="field.value" 
                    class="photo"
                    alt="个人照片"
                >
                <div v-else class="photo-placeholder">
                    {{ field.placeholder }}
                </div>
            </div>
        </template>

        <div class="text-sm mb-1">
            <div 
                v-for="(row, rowIndex) in groupedFields" 
                :key="`row-${rowIndex}-${row.length}`"
                class="preview-row"
            >
                <template v-for="field in row" :key="`field-${field.key}-${field.row}-${field.span}`">
                    <div 
                        v-if="field.type !== 'image'"
                        class="field-item"
                        :class="[`span-${field.span || 1}`]"
                    >
                        <span class="field-value">
                            <template v-if="field.type === 'text'">
                                <div class="whitespace-pre-wrap leading-relaxed">{{ field.value || field.placeholder }}</div>
                            </template>
                            <template v-else>
                                {{ field.value || field.placeholder }}
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
    margin-bottom: 2px;
}

.preview-row:last-child {
    margin-bottom: 0;
}

.field-item {
    display: flex;
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

.photo-field {
    position: absolute;
    top: 0px;
    width: 100px;
    height: 110px;
    overflow: visible;
    border-radius: 4px;
    z-index: 1;
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