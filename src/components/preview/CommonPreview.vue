<script lang="ts" setup>
import { computed } from 'vue'
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
</script>

<template>
    <div class="pl-3 pr-3 rounded-lg bg-white">
        <div class="mb-4 border-b border-gray-100 pb-1 mt-2">
            <h2 class="text-base font-medium text-gray-800 m-0">{{ previewTemplate.title }}</h2>
        </div>
        <div class="text-sm mb-0">
            <div 
                v-for="field in previewTemplate.fields" 
                :key="field.key"
                class="flex mb-2 last:mb-0"
            >
                <span class="w-20 text-gray-500 flex-shrink-0">{{ field.label }}：</span>
                <span class="flex-1 text-gray-700">
                    <template v-if="field.type === 'text'">
                        <div class="whitespace-pre-wrap leading-relaxed">{{ data?.[field.key] || '暂无内容' }}</div>
                    </template>
                    <template v-else>
                        {{ data?.[field.key] || '暂无内容' }}
                    </template>
                </span>
            </div>
        </div>
    </div>
</template>