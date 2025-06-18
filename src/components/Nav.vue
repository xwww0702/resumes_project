<script lang="ts" setup>
import {saveData} from '../hooks/useSaveData'
import router from '../router'
import { useSaveResume } from '../service/saveResume'
import { useComponentStore } from '../store/useComponentStore'
import { useResumeStore } from '../store/useResumeStore'

const store = useComponentStore()
const resumeStore = useResumeStore()
const { saveResume } = useSaveResume()
const { createNewResume } = resumeStore

const newResume = ()=>{
    createNewResume()
    router.push('/')
}
</script>

<template>
    <el-menu class="h-14 bg-white border-b border-gray-200 flex items-center px-4" mode="horizontal" :ellipsis="false"
        text-color="#303133">
        <el-menu-item index="0" class="hover:bg-transparent">
            <img class="w-8 h-8" src="../assets/logo.png" alt="My logo" />
        </el-menu-item>

        <div class="flex items-center gap-3 ml-4">
            <el-button type="warning" plain class="flex items-center" @click="saveData(store.componentList, saveResume, resumeStore.currentResumeId,resumeStore.currentResumeTitle)">
                <span>保存</span>
            </el-button>
            <el-button type="warning" class="flex items-center">
                <span>导出 PDF</span>
            </el-button>
            <el-button type="warning" class="flex items-center" @click = newResume>
                <span>新建简历</span>
            </el-button>
        </div>

        <div class="flex-1"></div>

        <router-link to="/myResume">
            <el-menu-item index="1" class="text-gray-700">
                我的简历
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<style scoped>
:deep(.el-menu) {
    --el-menu-active-color: #ff5722;
    border-bottom: none;
}
</style>