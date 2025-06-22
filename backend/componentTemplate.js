// backend/componentTemplate.js
const mongoose = require('mongoose')

const ComponentTemplateSchema = new mongoose.Schema({
//   name: String,
config: {}, // 存储字段配置
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('ComponentTemplate', ComponentTemplateSchema)