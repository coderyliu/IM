import { createRouter, createWebHashHistory } from 'vue-router'

// 登录
const AppLogin = () => import('../views/login/index.vue')

// 404
const NotFound = () => import('../baseUI/notFound/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
