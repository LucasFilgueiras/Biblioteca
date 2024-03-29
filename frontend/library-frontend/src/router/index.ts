import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../views/index.vue'

const routes = [
  { path: '/', name: "home", component: HomePage },
  { path: '/books', name: "books", component: () => import("../views/Books.vue") },
  { path: '/categories', name: "categories", component: () => import("../views/Categories.vue") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router