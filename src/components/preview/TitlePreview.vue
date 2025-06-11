<script lang="ts" setup>
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="mb-1 border-b border-gray-100 pb-1 mt-2">
        <h2 class="text-base font-medium text-gray-800 m-0">{{ title }}</h2>
    </div>
</template>

<style scoped>
/* 如果需要特定样式可以在这里添加 */
</style> 