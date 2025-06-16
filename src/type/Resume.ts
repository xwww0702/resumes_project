import type { Component } from 'vue'

// 组件类型
export type ResumeComponentType = 'basic' | 'image-left' | 'content' | 'title' |'image-right'

// 字段类型
export type FieldType = 'text' | 'textarea' | 'image'

// 预览组件类型
export type PreviewComponentType = 'BasicInfoPreview' | null

// 组件字段
export interface ComponentField {
    key: string
    label: string
    type: FieldType
    value?: string
    span?: number
    row?: number
    placeholder?: string
    options?: string[]
    rules?: { required?: boolean; message?: string }[]
    alignment?: 'left' | 'right'
    isBold?: boolean
    isItalic?: boolean
}

// 组件配置
export interface ComponentConfig {
    title: string
    description: string
    align?:string
    icon?: string
    defaultFields: ComponentField[]
}

// 组件数据
export interface ComponentData {
    title?: string
    [key: string]: any
}

// 简历组件
export interface ResumeComponent {
    id: string
    type: ResumeComponentType
    // data?: ComponentData
    align:string,
    title?: string
    fields?: ComponentField[]
    template?: ComponentConfig
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

export interface ComponentTemplate {
    fields: ComponentField[]
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
    type: 'text' | 'number' | 'email' | 'textarea' | 'image'
    placeholder?: string
    rules?: FormRule[]
    span?: number // 字段占据的列数
    row?: number // 字段所在的行
}

export interface PreviewField {
    label: string
    key: string
    type?: 'text' | 'image'
    span?: number
    row?: number
}

export interface PreviewTemplate {
    fields: PreviewField[]
}

