import { defineStore } from 'pinia'
import type { ResumeComponent } from '../type/Resume'

interface ResumeState {
  components: ResumeComponent[]
  title: string
}

export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => ({
    components: [],
    title: 'my resume'
  }),

  actions: {
    addComponent(component: ResumeComponent) {
      this.components.push(component)
    },
    removeComponent(id: string) {
      this.components = this.components.filter(c => c.id !== id)
    },
    setComponents(components: ResumeComponent[]) {
      this.components = components
    },
    resetResume() {
      this.components = []
      this.title = '我的简历'+new Date().toLocaleDateString()
    }
  }
})