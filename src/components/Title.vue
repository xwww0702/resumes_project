<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useResumeStore } from '../store/useResumeStore'
const route = useRoute()
const title = ref('')
const store  = useResumeStore()
watch(
  () => route.query.title,
  (newtitle) => {
    // 只在有简历时同步标题
    store.currentResumeTitle = route.query.title as string
    if (route.query.id) {
      const resume = store.resumeList.find(r => r.id === route.query.id)
      title.value = resume?.title || ''
    }
  },
  { immediate: true, deep: true }
)

function handleTitleChange(newTitle: string) {
  // 更新 store 里的 title
  store.currentResumeTitle = newTitle
  const resume = store.resumeList.find(r => r.id === store.currentResumeId)
  if (resume) {
    resume.title = newTitle
  }
}
</script>


<template>
    <div class="resume-title-bar">
    <el-input
        v-model="title"
        placeholder="请输入简历标题"
        @change="handleTitleChange"
        class="resume-title-input"
        size="large"
        clearable
    />
    </div>
</template>


<style>
.resume-title-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}



</style>