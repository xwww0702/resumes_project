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
    const resumeComponents = ref<ResumeComponent[]>([])

    // 选中的组件
    const selectedComponent = ref<ResumeComponent | null>(null)
    
    // 当前激活的tab
    const activeTab = ref('components')


    const addComponent = (type: ResumeComponent) => {
        const component = {
          ...type,
          data: {},
          id: `${type.type}-${Date.now()}`,
        }
        resumeComponents.value.push(component)
        return component
    }

    const componentRefs = new Map<string, HTMLElement>()
    const componentHeights = new Map<string, number>()

    // 删除组件
    const removeComponent = (id: string) => {
        const index = resumeComponents.value.findIndex(comp => comp.id === id)
        if (index !== -1) {
            resumeComponents.value.splice(index, 1)
            // 如果删除的是当前选中的组件，清空选中状态
            if (selectedComponent.value?.id === id) {
                selectedComponent.value = null
            }
            componentRefs.delete(id)
            componentHeights.delete(id)
        }
    }

    // 更新组件数据
    const updateComponentData = (id: string, data: Record<string, any>) => {
        const component = resumeComponents.value.find(comp => comp.id === id)
        console.log(component,'111hhhhbbb');
        
        if (component) {
            component.data = { ...component.data, ...data }
        }
        console.log(resumeComponents.value,'resumeComponents');
        
    }

    // 选择组件并切换到编辑面板
    const selectComponent = (component: ResumeComponent) => {
        selectedComponent.value = component
        activeTab.value = 'editor'
    }

    return {
        componentList,
        selectedComponent,
        activeTab,
        resumeComponents,
        addComponent,
        removeComponent,
        updateComponentData,
        componentRefs,
        componentHeights,
        selectComponent
    }
})