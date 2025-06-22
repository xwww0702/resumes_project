const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// 中间件
app.use(cors())
// app.use(express.json())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// 数据库连接
mongoose.connect('mongodb://localhost:27017/resumes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB')
}).catch(err => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
})

const Resume = require('./shema')

// 请求验证中间件
const validateResumeData = (req, res, next) => {
    const { id, content, userId } = req.body
    if (!id || !Array.isArray(content) || !userId) {
        return res.status(400).json({ success: false, message: 'Invalid data format' })
    }
    next()
}

// 路由
app.post('/api/resume', validateResumeData, async (req, res) => {
    try {
        const { id, content, userId, title } = req.body
        
        // 查找是否存在相同 userId 和 id 的简历
        const existingResume = await Resume.findOne({ userId, id })
        
        if (existingResume) {
            // 如果存在，更新内容
            existingResume.content = content
            existingResume.title = title
            existingResume.updatedAt = new Date()
            await existingResume.save()
            res.json({ success: true, data: existingResume })
        } else {
            // 如果不存在，创建新简历
            const newResume = new Resume({
                id,
                userId,
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
                title
            })
            await newResume.save()
            res.json({ success: true, data: newResume })
        }
    } catch (err) {
        console.error('❌ Failed to save resume:', err)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

app.get('/api/resumes/:userId', async (req, res) => {
    try {
      const resumes = await Resume.find({ userId: req.params.userId });
      res.json({ success: true, data: resumes });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
})

app.get('/api/resume/:id', async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Missing userId' })
        }

        const resume = await Resume.findOne({ id: req.params.id, userId })
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' })
        }
        res.json({ success: true, data: resume })
    } catch (err) {
        console.error('❌ Failed to fetch resume:', err)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// 删除简历
app.delete('/api/resume/:id', async (req, res) => {
    try {
      const { userId } = req.query;
      const { id } = req.params;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: 'Missing userId' });
      }
  
      const deleted = await Resume.findOneAndDelete({ id, userId });
  
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Resume not found' });
      }
  
      res.json({ success: true, message: 'Resume deleted successfully' });
    } catch (err) {
      console.error('❌ Failed to delete resume:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  const ComponentTemplate = require('./componentTemplate')

  app.post('/api/component-template', async (req, res) => {
    try {
      const {  defaultFields } = req.body
      if ( !defaultFields ) return res.status(400).json({ message: '参数不完整' })
      const doc = await ComponentTemplate.create({ defaultFields })
      res.json({ success: true, data: doc })
    } catch (err) {
      res.status(500).json({ success: false, message: err.message })
    }
  })
  // 获取所有组件模板
app.get('/api/component-template', async (req, res) => {
    try {
      const list = await ComponentTemplate.find()
      res.json({ success: true, data: list })
    } catch (err) {
      res.status(500).json({ success: false, message: err.message })
    }
  })
// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err)
    res.status(500).json({ success: false, message: 'Internal server error' })
})

// 启动服务器
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`))