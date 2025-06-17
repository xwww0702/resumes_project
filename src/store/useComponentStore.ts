// 组件市场数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResumeComponent } from '../type/Resume'
import componentConfigs from '../config/componentConfigs'

export const useComponentStore = defineStore('component', () => {
    const componentList = ref<ResumeComponent[]>([])
    const selectedComponent = ref<ResumeComponent | null>(null)
    const activeTab = ref('components')
    const componentRefs = new Map<string, HTMLElement>()
    const componentHeights = new Map<string, number>()

    function addComponent(type: ResumeComponent['type']) {
        const config = componentConfigs[type]
        if (!config) {
            console.error(`Component type ${type} not found`)
            return null
        }

        const newComponent: ResumeComponent = {
            id: Date.now().toString(),
            type,
            title: config.title,
            align:config.align,
            fields: config.defaultFields.map(field => ({
                ...field,
                key: field.key || `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            }))
        }

        componentList.value.push(newComponent)
        
        return newComponent
    }

    function updateComponent(id: string, data: Partial<ResumeComponent>) {
        const index = componentList.value.findIndex(c => c.id === id)
        if (index !== -1) {
            componentList.value[index] = {
                ...componentList.value[index],
                ...data
            }
        }
    }

    function removeComponent(id: string) {
        const index = componentList.value.findIndex(c => c.id === id)
        if (index !== -1) {
            componentList.value.splice(index, 1)
            componentRefs.delete(id)
            componentHeights.delete(id)
        }
    }

    function selectComponent(component: ResumeComponent | null) {
        selectedComponent.value = component
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