import { ref, onMounted, onUnmounted } from 'vue'
import type { ResumeComponent, ComponentField } from '../type/Resume'
import { saveResumeRequest as saveResumeRequest, getResume,getAllResume } from './request'

interface ResumeData {
    id: string
    userId: string
    content: ResumeComponent[],
    title: string
}

export function useSaveResume() {
    const saveTimer = ref<number | null>(null)
    const isSaving = ref(false)

    const startAutoSave = (component: ResumeComponent) => {
        // 清除之前的定时器
        if (saveTimer.value) {
            clearTimeout(saveTimer.value)
        }

        // 设置新的定时器
        //需要更改title逻辑
        saveTimer.value = window.setTimeout(() => {
            const data: ResumeData = {
                id: component.id,
                userId: 'user123',
                content: [component],
                title: ''
            }
            saveResume(data)
        }, 1000) // 1秒后自动保存
    }

    const saveResume = async (data: ResumeData) => {
        if (isSaving.value) return

        try {
            isSaving.value = true
            const response = await saveResumeRequest(data.id, data.content, data.userId,data.title)
            console.log('保存成功:', response)
            return response
        } catch (error) {
            console.error('保存失败:', error)
            throw error
        } finally {
            isSaving.value = false
        }
    }

    // 组件卸载时清除定时器
    onUnmounted(() => {
        if (saveTimer.value) {
            clearTimeout(saveTimer.value)
        }
    })

    return {
        startAutoSave,
        saveResume,
        isSaving
    }
}

export function useGetResume(id: string) {
    const controller = new AbortController()

    onUnmounted(() => {
        controller.abort()
    })

    const fetchData = async () => {
        try {
            const res = await getAllResume(id, controller.signal)
            console.log('获取结果:', res)
        } catch (err: any) {
            if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
                console.warn('获取请求被取消')
            } else {
                console.error('获取请求失败:', err)
            }
        }
    }

    return { fetchData }
}

export function userGetAllResume(userId: string) {
    const controller = new AbortController()

    onUnmounted(() => {
        controller.abort()
    })
    const fetchData = async () => {
        try {
            const res = await getAllResume(userId, controller.signal)
            console.log('获取结果:', res)
            return res.data.data
        } catch (err: any) {
            if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
                console.warn('获取请求被取消')
            } else {
                console.error('获取请求失败:', err)
            }
            return []
        }
    }

    return { fetchData }
}