import type { Component } from 'vue'

// 定义组件接口
export interface ResumeComponent {
    id: string
    name: string
    icon: string
    type: 'basic' | 'education' | 'work' | 'project' | 'skills'
    preview: Component | null
}
