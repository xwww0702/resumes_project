import type { FormField } from '../type/Resume'

export const formFields: Record<string, FormField[]> = {
    basic: [
        {
            name: 'photo',
            label: '照片',
            type: 'image',
            placeholder: '请上传照片',
            rules: [
                { required: true, message: '请上传照片', trigger: 'change' }
            ],
            span: 1,
            row: 1
        },
        {
            name: 'name',
            label: '姓名',
            type: 'text',
            placeholder: '请输入姓名',
            rules: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            span: 1,
            row: 1
        },
        {
            name: 'age',
            label: '年龄',
            type: 'number',
            placeholder: '请输入年龄',
            rules: [
                { required: true, message: '请输入年龄', trigger: 'blur' },
                { pattern: /^\d+$/, message: '年龄必须为数字', trigger: 'blur' }
            ],
            span: 1,
            row: 1
        },
        {
            name: 'phone',
            label: '电话',
            type: 'text',
            placeholder: '请输入电话号码',
            rules: [
                { required: true, message: '请输入电话号码', trigger: 'blur' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
            ],
            span: 1,
            row: 2
        },
        {
            name: 'email',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱',
            rules: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            span: 1,
            row: 2
        }
    ],
    education: [
        {
            name: 'school',
            label: '学校',
            type: 'text',
            placeholder: '请输入学校名称',
            rules: [
                { required: true, message: '请输入学校名称', trigger: 'blur' }
            ],
            span: 2,
            row: 1
        },
        {
            name: 'major',
            label: '专业',
            type: 'text',
            placeholder: '请输入专业名称',
            rules: [
                { required: true, message: '请输入专业名称', trigger: 'blur' }
            ],
            span: 1,
            row: 1
        },
        {
            name: 'degree',
            label: '学历',
            type: 'text',
            placeholder: '请输入学历',
            rules: [
                { required: true, message: '请输入学历', trigger: 'blur' }
            ],
            span: 1,
            row: 2
        },
        {
            name: 'time',
            label: '时间',
            type: 'text',
            placeholder: '例如：2018.09 - 2022.06',
            rules: [
                { required: true, message: '请输入就读时间', trigger: 'blur' }
            ],
            span: 2,
            row: 2
        }
    ],
    work: [
        {
            name: 'company',
            label: '公司',
            type: 'text',
            placeholder: '请输入公司名称',
            rules: [
                { required: true, message: '请输入公司名称', trigger: 'blur' }
            ],
            span: 2,
            row: 1
        },
        {
            name: 'position',
            label: '职位',
            type: 'text',
            placeholder: '请输入职位名称',
            rules: [
                { required: true, message: '请输入职位名称', trigger: 'blur' }
            ],
            span: 1,
            row: 1
        },
        {
            name: 'time',
            label: '时间',
            type: 'text',
            placeholder: '例如：2020.03 - 至今',
            rules: [
                { required: true, message: '请输入工作时间', trigger: 'blur' }
            ],
            span: 3,
            row: 2
        },
        {
            name: 'description',
            label: '工作描述',
            type: 'textarea',
            placeholder: '请输入工作描述',
            rules: [
                { required: true, message: '请输入工作描述', trigger: 'blur' }
            ],
            span: 3,
            row: 3
        }
    ],
    project: [
        {
            name: 'name',
            label: '项目名称',
            type: 'text',
            placeholder: '请输入项目名称',
            rules: [
                { required: true, message: '请输入项目名称', trigger: 'blur' }
            ],
            span: 2,
            row: 1
        },
        {
            name: 'role',
            label: '担任角色',
            type: 'text',
            placeholder: '请输入担任角色',
            rules: [
                { required: true, message: '请输入担任角色', trigger: 'blur' }
            ],
            span: 1,
            row: 1
        },
        {
            name: 'time',
            label: '时间',
            type: 'text',
            placeholder: '例如：2021.01 - 2021.06',
            rules: [
                { required: true, message: '请输入项目时间', trigger: 'blur' }
            ],
            span: 3,
            row: 2
        },
        {
            name: 'description',
            label: '项目描述',
            type: 'textarea',
            placeholder: '请输入项目描述',
            rules: [
                { required: true, message: '请输入项目描述', trigger: 'blur' }
            ],
            span: 3,
            row: 3
        }
    ],
    skills: [
        {
            name: 'content',
            label: '技能描述',
            type: 'textarea',
            placeholder: '请输入技能描述',
            rules: [
                { required: true, message: '请输入技能描述', trigger: 'blur' }
            ],
            span: 3,
            row: 1
        }
    ]
} 