import { createRouter, createWebHistory } from 'vue-router'
import LayOut from '@/views/layout/LayOut.vue'
import store from '@/store/index'
const routes = [
  //登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/pages/Login.vue')
  },
  {
    path: '/',
    name: 'layOut',
    component: LayOut,
    children: [
      {
        path: '/',
        redirect: 'index',
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/pages/Welcome.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('../views/pages/RolesList.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/pages/UsersList.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/pages/GoodsList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
//路由守卫
router.beforeEach((to, from, next) => {
  //未登录
  if (!store.state.user.userInfo) {
    if (to.path == '/login') {
      next()
    } else {
      alert('您未登录，请先登录')
      next('/login')
    }
  } else {
    //登录
    next()
  }
})
export default router
