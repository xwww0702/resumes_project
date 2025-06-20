# 类低代码组件编辑器

简历编辑器是一个前端可视化工具，帮助用户通过拖拽和表单方式快速编辑和生成个性化简历。它主要包括以下模块：


### 主要功能

组件化编辑：支持基本信息、内容、图片、标题等多种简历组件的增删改查。

组件拖拽与布局：有一个组件库，提供了基础的类型，用户可自定义字段顺序、分组和样式，提升排版灵活性。

图片处理：支持图片上传、裁剪、压缩，适合证件照、头像等场景。

实时预览：左侧编辑，右侧实时预览，所见即所得。

本地/后端持久化：支持数据本地存储或与后端同步，刷新不丢失。

PDF 导出：一键导出高质量 PDF 简历。

### 技术栈
Vue 3 + Pinia 状态管理

Element Plus UI 组件库

TailWind CSS

toBolb/jspdf PDF 导出

Lodash/throttle、vuedraggable 等辅助库


### 目录结构
```
src/components/
  ├── editor/           # 编辑器核心组件
  │   ├── CommonEditor.vue
  │   ├── ContentEditor.vue
  │   ├── FieldManager.vue
  │   ├── ImageEditor.vue
  │   └── Layout.vue
  ├── preview/          # 预览相关组件
  ├── ResumePreview.vue # 简历整体预览
  ├── ResumeCompPart.vue# 编辑器左侧组件市场
  ├── EditPart.vue      # 编辑器右侧表单区
  └── Nav.vue           # 顶部导航栏
  ...还没完成
  ```

### 适用场景
个人简历制作

### 用法
拖拽组件到编辑区，填写内容

编辑图片、文本、标题等字段

实时预览排版效果

点击“导出 PDF”按钮生成简历 PDF 文件