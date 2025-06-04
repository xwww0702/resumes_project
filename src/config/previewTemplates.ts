import type { PreviewTemplate } from '../type/Resume'

export const previewTemplates: Record<string, PreviewTemplate> = {
    basic: {
        title: '基本信息',
        fields: [
            { label: '姓名', key: 'name' },
            { label: '年龄', key: 'age' },
            { label: '电话', key: 'phone' },
            { label: '邮箱', key: 'email' }
        ]
    },
    education: {
        title: '教育经历',
        fields: [
            { label: '学校', key: 'school' },
            { label: '专业', key: 'major' },
            { label: '学历', key: 'degree' },
            { label: '时间', key: 'time' }
        ]
    },
    work: {
        title: '工作经历',
        fields: [
            { label: '公司', key: 'company' },
            { label: '职位', key: 'position' },
            { label: '时间', key: 'time' },
            { label: '描述', key: 'description', type: 'text' }
        ]
    },
    project: {
        title: '项目经历',
        fields: [
            { label: '项目名称', key: 'name' },
            { label: '担任角色', key: 'role' },
            { label: '时间', key: 'time' },
            { label: '描述', key: 'description', type: 'text' }
        ]
    },
    skills: {
        title: '技能特长',
        fields: [
            { label: '技能描述', key: 'content', type: 'text' }
        ]
    }
} 