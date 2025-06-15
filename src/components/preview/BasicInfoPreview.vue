<script setup lang="ts">
import type { ComponentField } from '../../type/Resume'

interface Props {
    fields: ComponentField[]
}

const props = defineProps<Props>()

const getFieldValue = (key: string) => {
    const field = props.fields.find(f => f.key === key)
    return field?.value || ''
}

const getImageAlignment = (key: string) => {
    const field = props.fields.find(f => f.key === key)
    return field?.alignment || 'left'
}
</script>

<template>
    <div class="basic-info">
        <div v-if="getFieldValue('avatar')" class="flex items-center gap-4">
            <img 
                :src="getFieldValue('avatar')" 
                class="w-24 h-24 rounded-full object-cover"
                :class="getImageAlignment('avatar') === 'right' ? 'order-2' : 'order-1'"
            />
            <div class="flex-1" :class="getImageAlignment('avatar') === 'right' ? 'order-1' : 'order-2'">
                <h2 class="text-2xl font-bold mb-2">{{ getFieldValue('name') }}</h2>
                <div class="text-gray-600">
                    <p>{{ getFieldValue('phone') }}</p>
                    <p>{{ getFieldValue('email') }}</p>
                    <p>{{ getFieldValue('address') }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="text-2xl font-bold mb-2">{{ getFieldValue('name') }}</h2>
            <div class="text-gray-600">
                <p>{{ getFieldValue('phone') }}</p>
                <p>{{ getFieldValue('email') }}</p>
                <p>{{ getFieldValue('address') }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.basic-info {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 