import type { ResumeComponentType, ComponentConfig } from '../type/Resume'
import { reactive } from 'vue'

const componentConfigs = reactive<Record<ResumeComponentType, ComponentConfig>>({
    basic: {
        title: '基本信息',
        description: '包含姓名、年龄等基本信息的组件',
        icon: 'user',
        id:'market-0',
        defaultFields: [
            { key: 'name', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'age', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'phone', label: 'field1', type: 'text', span: 1, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'email', label: 'field1', type: 'text', span: 1, row: 2, placeholder: '请输入内容', value: '' }
        ]
    },
    'image-left': {
        title: '照片组件',
        description: '用于上传和显示照片的组件',
        icon: 'picture',
        align: 'left',
        id:'market-1',
        defaultFields: [
            { key: 'image', label: '照片', type: 'image', span: 1, row: 1, placeholder: '未上传照片', value: '' },
            { key: 'name', label: '姓名', type: 'text', span: 1, row: 1, placeholder: '请输入姓名', value: '' },
            { key: 'age', label: '年龄', type: 'text', span: 1, row: 1, placeholder: '请输入年龄', value: '' },
            { key: 'nation', label: '民族', type: 'text', span: 1, row: 1, placeholder: '请输入民族', value: '' },
            { key: 'phone', label: '电话', type: 'text', span: 1, row: 2, placeholder: '请输入邮箱', value: '' },
            { key: 'email', label: '邮箱', type: 'text', span: 2, row: 2, placeholder: '请输入邮箱', value: '' },
        ]
    },
'image-right': {
        title: '照片组件',
        align: 'right',
        description: '用于上传和显示照片的组件',
        icon: 'picture',
        id:'market-2',
        defaultFields: [
            { key: 'image', label: '照片', type: 'image', span: 1, row: 1, placeholder: '未上传照片', value: '' },
            { key: 'name', label: '姓名', type: 'text', span: 1, row: 1, placeholder: '请输入姓名', value: '' },
            { key: 'age', label: '年龄', type: 'text', span: 1, row: 1, placeholder: '请输入年龄', value: '' },
            { key: 'nation', label: '民族', type: 'text', span: 1, row: 1, placeholder: '请输入民族', value: '' },
            { key: 'phone', label: '电话', type: 'text', span: 1, row: 2, placeholder: '请输入邮箱', value: '' },
            { key: 'email', label: '邮箱', type: 'text', span: 2, row: 2, placeholder: '请输入邮箱', value: '' },
        ]
    },
    content: {
        title: '内容组件',
        description: '通用内容组件，可以自定义字段和布局',
        icon: 'document',
        id:'market-3',
        defaultFields: [
            { key: 'field1', label: 'field1', type: 'text', span: 2, row: 1, placeholder: '请输入内容', value: '' },
            { key: 'field2', label: 'field2', type: 'textarea', span: 2, row: 2, placeholder: '请输入内容', value: '' }
        ]
    },
    title: {
        title: '标题组件',
        description: '用于显示标题的组件',
        icon: 'title',
        id:'market-4',
        defaultFields: [
            { key: 'title', label: '标题', type: 'text', span: 1, row: 1, placeholder: '请输入标题', value: '' }
        ]
    },
    user:{
        title: 'user component',
        description: '用户自定义',
        icon: 'user',
        id:'market-5',
        defaultFields: []
    }
})

export default componentConfigs 