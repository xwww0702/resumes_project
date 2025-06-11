// 组件市场数据

import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ResumeComponent, ComponentField } from '../type/Resume'
import componentConfigs from '../config/componentConfigs'

export const useComponentStore = defineStore('component', () => {
    const componentList = ref<ResumeComponent[]>([])
    const selectedComponent = ref<ResumeComponent | null>(null)
    const activeTab = ref('components')
    const componentRefs = new Map<string, HTMLElement>()
    const componentHeights = new Map<string, number>()

    // 添加组件
    const addComponent = (type: ResumeComponent['type']) => {
        const config = componentConfigs[type]
        const newComponent: ResumeComponent = {
            id: Date.now().toString(),
            type,
            data: {
                title: config.title
            },
            fields: config.defaultFields,
            template: config
        }
        componentList.value.push(newComponent)
        selectedComponent.value = newComponent
        return newComponent
         
    }

    // 更新组件
    const updateComponent = (id: string, updates: Partial<ResumeComponent>) => {
        const index = componentList.value.findIndex(comp => comp.id === id)
        if (index !== -1) {
            componentList.value[index] = {
                ...componentList.value[index],
                ...updates
            }
            if (selectedComponent.value?.id === id) {
                selectedComponent.value = componentList.value[index]
            }
        }
    }

    // 删除组件
    const removeComponent = (id: string) => {
        const index = componentList.value.findIndex(comp => comp.id === id)
        if (index !== -1) {
            componentList.value.splice(index, 1)
            if (selectedComponent.value?.id === id) {
                selectedComponent.value = null
            }
            componentRefs.delete(id)
            componentHeights.delete(id)
        }
    }

    // 选择组件
    const selectComponent = (id: string) => {
        const component = componentList.value.find(comp => comp.id === id)
        selectedComponent.value = component || null
        activeTab.value = 'editor'
    }

    return {
        componentList,
        selectedComponent,
        activeTab,
        componentRefs,
        componentHeights,
        addComponent,
        updateComponent,
        removeComponent,
        selectComponent
    }
})