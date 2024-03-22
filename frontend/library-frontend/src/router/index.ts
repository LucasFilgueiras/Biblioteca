import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '../pages/index.vue'
import BooksPage from '../pages/books.vue'
import CategoriesPage from '../pages/categories.vue'

const routes = [
  { path: '/', component: HomePage, name: "home" },
  { path: '/books', component: BooksPage, name: "books" },
  { path: '/categories', component: CategoriesPage, name: "categories" },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router