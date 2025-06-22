// 组件市场数据

import { defineStore } from 'pinia'
import {  ref } from 'vue'
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
                key: `${field.key}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            }))
        }

        componentList.value.push(newComponent)
        
        return newComponent
    }

    function updateComponent(id: string, data: Partial<ResumeComponent>) {
        const index = componentList.value.findIndex(c => c.id === id)
        if (index !== -1) {
            // 1. 合并新旧数据，更新 componentList 中的原始组件
            const updatedComponent = {
                ...componentList.value[index],
                ...data
            }
            componentList.value[index] = updatedComponent
            
            // 2. (关键修复) 同时，用更新后的数据刷新 selectedComponent 副本
            selectedComponent.value = JSON.parse(JSON.stringify(updatedComponent));
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
        if (component) {
            // (关键修复) 使用深拷贝创建副本，防止直接修改原始状态
            selectedComponent.value = JSON.parse(JSON.stringify(component));
        } else {
            selectedComponent.value = null;
        }
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
}, {
    persist: true
  })