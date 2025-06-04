// 组件市场数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResumeComponent } from '../type/Resume'
import { componentTemplates } from '../config/componentTemplates'

export const useComponentStore = defineStore('component', () => {
    // 组件列表
    const componentList = ref<ResumeComponent[]>(
        Object.entries(componentTemplates).map(([type, template]) => ({
            id: `${type}-${Date.now()}`,
            type,
            data: {}
        }))
    )

    // 添加组件
    const addComponent = (type: string) => {
        const component: ResumeComponent = {
            id: `${type}-${Date.now()}`,
            type,
            data: {}
        }
        componentList.value.push(component)
        return component
    }

    // 删除组件
    const removeComponent = (id: string) => {
        const index = componentList.value.findIndex(comp => comp.id === id)
        if (index !== -1) {
            componentList.value.splice(index, 1)
        }
    }

    // 更新组件数据
    const updateComponentData = (id: string, data: Record<string, any>) => {
        const component = componentList.value.find(comp => comp.id === id)
        if (component) {
            component.data = { ...component.data, ...data }
        }
    }

    return {
        componentList,
        addComponent,
        removeComponent,
        updateComponentData
    }
})