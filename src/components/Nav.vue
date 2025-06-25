<script lang="ts" setup>
import {saveData} from '../hooks/useSaveData'
import router from '../router'
import { useSaveResume } from '../service/saveResume'
import { useComponentStore } from '../store/useComponentStore'
import { useResumeStore } from '../store/useResumeStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useComponentStore()
const resumeStore = useResumeStore()
const { saveResume } = useSaveResume()
const { createNewResume } = resumeStore
import {exportPDF,exportJSON} from '../hooks/useExport'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
const newResume = ()=>{
    let newid = createNewResume()
    console.log(newid);
    
    router.push({
        path: '/Home',
        query: {
            id: newid,
            title: '未命名简历'
        }
        })
}
const autoSaveTimer = ref<ReturnType<typeof setTimeout> | null>(null)
// 监听简历内容变化
watch(
  () => store.componentList, // 或 resumeList
  () => {
    // 有变化时，重置定时器
    if (autoSaveTimer.value) clearTimeout(autoSaveTimer.value)
    autoSaveTimer.value = setTimeout(() => {
      // 这里调用你的保存逻辑
      saveData(store.componentList, saveResume, resumeStore.currentResumeId,resumeStore.currentResumeTitle)
      ElMessage.success('已自动保存')
    }, 30000) // 30秒
  },
  { deep: true }
)

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
            <el-button type="warning" class="flex items-center" :disabled="!route.query.id" @click="exportPDF">
                <span>导出 PDF</span>
            </el-button>
            <el-button type="warning" class="flex items-center" :disabled="!route.query.id" @click="exportJSON(store.componentList)">
                <span>导出 JSON</span>
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