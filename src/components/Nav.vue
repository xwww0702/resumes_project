<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>

<template>
    <el-menu class="h-14 bg-white border-b border-gray-200 flex items-center px-4" mode="horizontal" :ellipsis="false" text-color="#303133">
        <el-menu-item index="0" class="hover:bg-transparent">
            <img class="w-8 h-8" src="../assets/logo.png" alt="My logo" />
        </el-menu-item>

        <div class="flex items-center gap-3 ml-4">
            <el-button type="warning" plain class="flex items-center">
                <span>保存</span>
            </el-button>
            <el-button type="warning" class="flex items-center">
                <span>导出 PDF</span>
            </el-button>
        </div>

        <div class="flex-1"></div>

        <el-menu-item index="1" class="text-gray-700">我的简历</el-menu-item>
    </el-menu>
</template>

<style scoped>
:deep(.el-menu) {
    --el-menu-active-color: #ff5722;
    border-bottom: none;
}
</style>