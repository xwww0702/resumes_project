import type { ResumeComponentType, ComponentConfig } from '../type/Resume'
import { reactive } from 'vue'

const componentConfigs = reactive<Record<ResumeComponentType, ComponentConfig>>({
    basic: {
        title: '基本信息',
        description: 'basic',
        icon: 'user',
        defaultFields: [
            { key: 'basic-name', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'basic-age', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'basic-phone', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
        ]
    },
    'basic-time': {
        title: '基本信息',
        description: 'basic',
        icon: 'user',
        defaultFields: [
            { key: 'basic-name', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'basic-age', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'basic-phone', label: 'field1', type: 'time', span: 1, row: 1, placeholder: '请选择时间', value: { start: '', end: '' } },
        ]
    },
    'image-left': {
        title: '照片组件',
        description: '用于上传和显示照片的组件',
        icon: 'picture',
        align: 'left',
        defaultFields: [
            { key: 'image-left-image', label: '照片', type: 'image', span: 1, row: 1, placeholder: '未上传照片', value: '' },
            { key: 'image-left-name', label: '姓名', type: 'text', span: 1, row: 1, placeholder: '请输入姓名', value: '' },
            { key: 'image-left-age', label: '年龄', type: 'text', span: 1, row: 1, placeholder: '请输入年龄', value: '' },
            { key: 'image-left-nation', label: '民族', type: 'text', span: 1, row: 1, placeholder: '请输入民族', value: '' },
            { key: 'image-left-phone', label: '电话', type: 'text', span: 1, row: 2, placeholder: '请输入邮箱', value: '' },
            { key: 'image-left-email', label: '邮箱', type: 'text', span: 2, row: 2, placeholder: '请输入邮箱', value: '' },
        ]
    },
'image-right': {
        title: '照片组件',
        align: 'right',
        description: '用于上传和显示照片的组件',
        icon: 'picture',
        defaultFields: [
            { key: 'image-right-image', label: '照片', type: 'image', span: 1, row: 1, placeholder: '未上传照片', value: '' },
            { key: 'image-right-name', label: '姓名', type: 'text', span: 1, row: 1, placeholder: '请输入姓名', value: '' },
            { key: 'image-right-age', label: '年龄', type: 'text', span: 1, row: 1, placeholder: '请输入年龄', value: '' },
            { key: 'image-right-nation', label: '民族', type: 'text', span: 1, row: 1, placeholder: '请输入民族', value: '' },
            { key: 'image-right-phone', label: '电话', type: 'text', span: 1, row: 2, placeholder: '请输入邮箱', value: '' },
            { key: 'image-right-email', label: '邮箱', type: 'text', span: 2, row: 2, placeholder: '请输入邮箱', value: '' },
        ]
    },
    content: {
        title: '内容组件',
        description: '通用内容组件，可以自定义字段和布局',
        icon: 'document',
        defaultFields: [
            { key: 'content-field1', label: 'field1', type: 'text', span: 2, row: 2, placeholder: '请输入内容', value: '' }
        ]
    },
    title: {
        title: '标题组件',
        description: '用于显示标题的组件',
        icon: 'title',
        defaultFields: [
            { key: 'title-title', label: '标题', type: 'text', span: 1, row: 1, placeholder: '请输入标题', value: '' }
        ]
    },
    'content-time': {
        title: '标题组件',
        description: '用于显示标题的组件',
        icon: 'title',
        defaultFields: [
            { key: 'content-time-company', label: '公司', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'content-time-title', label: '职位', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'content-time-time', label: '时间', type: 'time', span: 1, row: 1, placeholder: '请选择时间', value: { } },
            { key: 'content-time-detail1', label: '详情1', type: 'textarea', span: 3, row: 2, placeholder: '请输入内容', value: '' },
            { key: 'content-time-detail2', label: '详情2', type: 'textarea', span: 3, row: 3, placeholder: '请输入内容', value: '' },
            { key: 'content-time-detail3', label: '详情3', type: 'textarea', span: 3, row: 4, placeholder: '请输入内容', value: '' },
        ]
    },
    'education': {
        title: '教育组件',
        description: '用于显示教育的组件',
        icon: 'education',
        defaultFields: [
            { key: 'education-school', label: '学校', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'education-major', label: '专业', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'education-time', label: '时间', type: 'time', span: 1, row: 1, placeholder: '请选择时间', value: { } },
            { key: 'education-type', label: '本科/硕士', type: 'text', span: 1, row: 2, placeholder: '请输入内容', value: '' },
            { key: 'education-grade', label: '成绩', type: 'text', span: 1, row: 2, placeholder: '请输入内容', value: '' },
            { key: 'education-range', label: '排名', type: 'text', span: 1, row: 2, placeholder: '请输入内容', value: '' },
        ]
    }
})

export default componentConfigs 