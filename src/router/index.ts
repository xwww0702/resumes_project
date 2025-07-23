import { createRouter, createWebHistory } from "vue-router";
import MyResume from "../views/MyResume.vue";
const routes = [
  { path: "/", redirect: "/myResume" },
  {
    path: "/Home",
    name: "Home",
    component: () => import("../views/HomeViews.vue"),
  },
  { path: "/myResume", name: "myResume", component: MyResume },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
