import { createRouter, createWebHistory } from 'vue-router'
import HomeViews from '../views/HomeViews.vue'
import MyResume from '../views/MyResume.vue'
const routes = [
    { path: '/', name: 'Home', component: HomeViews},
    { path: '/myResume', name: 'Resume', component: MyResume },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router