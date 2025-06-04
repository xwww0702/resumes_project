import type { Component } from 'vue'

// 定义组件类型
export type ResumeComponentType = 'basic' | 'education' | 'work' | 'project' | 'skills'

// 定义预览组件类型
export type PreviewComponentType = 'BasicInfoPreview' | null

// 定义组件接口
export interface ResumeComponent {
    id: string
    type: string
    data: Record<string, any>
}

// 定义组件映射接口
export interface ComponentMap {
    [key: string]: any
}

// 定义编辑器映射接口
export interface EditorMap {
    basic: Component
}

// 定义基本信息表单数据接口
export interface BasicInfoFormData {
    name: string
    age: string
    phone: string
    email: string
}

export interface ComponentData {
    [key: string]: any
}

export interface ComponentField {
    label: string
    key: string
    type?: 'text' | 'input' | 'date'
}

export interface ComponentTemplate {
    title: string
    fields: ComponentField[]
}

export interface ResumeData {
    components: ResumeComponent[]
}

export interface FormRule {
    required?: boolean
    message: string
    trigger: string
    min?: number
    max?: number
    type?: string
    pattern?: RegExp
}

export interface FormField {
    name: string
    label: string
    type: 'text' | 'number' | 'email' | 'textarea'
    placeholder: string
    rules: FormRule[]
}

export interface PreviewField {
    label: string
    key: string
    type?: 'text'
}

export interface PreviewTemplate {
    title: string
    fields: PreviewField[]
}
