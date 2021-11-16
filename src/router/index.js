import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/Home')
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '我的'
        },
        component: () => import('@/views/User')
      },
      {
        path: '/apps',
        name: 'Apps',
        meta: {
          title: '应用'
        },
        component: () => import('@/views/Apps')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !Store.state.user) next({ name: 'Login' })
  next()
})

export default router
