import type { PreviewTemplate } from '../type/Resume'

export const previewTemplates: Record<string, PreviewTemplate> = {
    basic: {
        title: '基本信息',
        fields: [
            { label: '照片', key: 'photo', type: 'image', span: 1, row: 1 },
            { label: '姓名', key: 'name', span: 1, row: 1 },
            { label: '年龄', key: 'age', span: 1, row: 1 },
            { label: '电话', key: 'phone', span: 1, row: 2 },
            { label: '邮箱', key: 'email', span: 1, row: 2 }
        ]
    },
    education: {
        title: '教育经历',
        fields: [
            { label: '学校', key: 'school', span: 2, row: 1 },
            { label: '专业', key: 'major', span: 1, row: 1 },
            { label: '学历', key: 'degree', span: 1, row: 2 },
            { label: '时间', key: 'time', span: 2, row: 2 }
        ]
    },
    work: {
        title: '工作经历',
        fields: [
            { label: '公司', key: 'company', span: 2, row: 1 },
            { label: '职位', key: 'position', span: 1, row: 1 },
            { label: '时间', key: 'time', span: 3, row: 2 },
            { label: '描述', key: 'description', type: 'text', span: 3, row: 3 }
        ]
    },
    project: {
        title: '项目经历',
        fields: [
            { label: '项目名称', key: 'name', span: 2, row: 1 },
            { label: '担任角色', key: 'role', span: 1, row: 1 },
            { label: '时间', key: 'time', span: 3, row: 2 },
            { label: '描述', key: 'description', type: 'text', span: 3, row: 3 }
        ]
    },
    skills: {
        title: '技能特长',
        fields: [
            { label: '技能描述', key: 'content', type: 'text', span: 3, row: 1 }
        ]
    }
} 