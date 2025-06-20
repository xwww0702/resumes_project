import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { ResumeComponent, ResumeData } from '../type/Resume'

export const useResumeStore = defineStore('resume', () => {
    const currentResumeId = ref('')
    const currentResumeTitle = ref('')
    const resumeList = ref<ResumeData[]>([])
    const resumeIds = ref<string[]>([])

    // 初始化store
    const init = () => {
        // 如果没有当前简历ID，创建一个新的
        if (!currentResumeId.value) {
            createNewResume()
        }
    }

    // 创建新简历
    const createNewResume = () => {
        const newId = uuidv4()
        currentResumeId.value = newId
        resumeIds.value.push(newId)
        return newId
    }

    // 切换到指定简历
    const switchResume = (id: string) => {
        if (resumeIds.value.includes(id)) {
            currentResumeId.value = id
        } else {
            console.error('Resume not found:', id)
        }
    }
    return {
        currentResumeId,
        resumeList,
        resumeIds,
        currentResumeTitle,
        createNewResume,
        switchResume,
        init
    }
}, {
    persist: true
  }) 