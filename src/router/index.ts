import { createRouter, createWebHistory } from 'vue-router'
import HomeViews from '../views/HomeViews.vue'
import MyResume from '../views/MyResume.vue'
const routes = [
  {path:'/',redirect:'/myResume'},
    { path: '/Home', name: 'Home', component: HomeViews},
    { path: '/myResume', name: 'myResume', component: MyResume },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router