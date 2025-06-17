<script lang="ts" setup>
import { ref } from 'vue'
import { useSaveResume } from '../hooks/useSaveResume'
import { useComponentStore } from '../store/useComponentStore'
import { useResumeStore } from '../store/useResumeStore'
import type { ResumeComponent } from '../type/Resume'

const activeIndex = ref('1')
const { componentList } = useComponentStore()
const { saveResume } = useSaveResume()
const { currentResumeId } = useResumeStore()

const saveData = async () => {
    
    // 处理图片URL

    const processedFields = await Promise.all(componentList.map(async comp => {
        if (!comp.fields) return []
        return Promise.all(comp.fields.map(async field => {
            if (field.type === 'image' && field.value) {
                if (field.value.length > 1000) {
                    field.value = await compressImageUrl(field.value)
                }
            }
            // 转换为普通对象
            return JSON.parse(JSON.stringify(field))
        }))
    })).then(fields => fields.flat())


    const resumeData = {
        id: currentResumeId,
        userId: 'user123',
        content: JSON.parse(JSON.stringify(componentList))
    }
    try {
        await saveResume(resumeData)
    } catch (error: any) {
        console.error('Save failed:', error.response?.data || error)
    }
}

// 图片URL压缩函数
const compressImageUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    
    // 创建canvas来压缩图片
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 设置最大尺寸
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            
            // 压缩为较低质量的JPEG
            resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.src = URL.createObjectURL(blob);
    });
}
</script>

<template>
    <el-menu class="h-14 bg-white border-b border-gray-200 flex items-center px-4" mode="horizontal" :ellipsis="false" text-color="#303133">
        <el-menu-item index="0" class="hover:bg-transparent">
            <img class="w-8 h-8" src="../assets/logo.png" alt="My logo" />
        </el-menu-item>

        <div class="flex items-center gap-3 ml-4">
            <el-button type="warning" plain class="flex items-center" @click="saveData">
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