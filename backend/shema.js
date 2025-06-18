const mongoose = require('mongoose')

// 组件字段模式
const ComponentFieldSchema = new mongoose.Schema({
    key: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
        trim: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    span: {
        type: Number,
        default: 24,
        min: 1,
        max: 24
    },
    row: {
        type: Number,
        default: 1
    },
    fontSize: {
        type: String,
        default: 'text-base'
    },
    isBold: {
        type: Boolean,
        default: false
    },
    isItalic: {
        type: Boolean,
        default: false
    },
    listStyle: {
        type: String,
        default: 'none'
    }
})

// 组件模式
const ResumeComponentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
        trim: true
    },
    fields: {
        type: [ComponentFieldSchema],
        default: []
    },
    align:{
        type:String,
    },
    id:{
        type:String,
    }
})

// 简历模式
const ResumeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: [ResumeComponentSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    title:{
        type:String,
        required: true,
        trim: true
    }
})

// 更新时间中间件
ResumeSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
})

// 创建模型
const Resume = mongoose.model('Resume', ResumeSchema)

module.exports = Resume