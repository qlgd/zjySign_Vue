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
      },
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index'),
        children: [
          {
            path: 'card',
            name: 'card',
            meta: {
              title: '使用卡密'
            },
            component: () => import('@/components/card.vue')
          },
          {
            path: 'answer',
            name: 'answer',
            meta: {
              title: '考中查答'
            },
            component: () => import('@/components/answer.vue')
          },
          {
            path: 'integral',
            name: 'integral',
            meta: {
              title: '使用积分'
            },
            component: () => import('@/components/integral.vue')
          },
          {
            path: 'setting',
            name: 'setting',
            meta: {
              title: '签到设置'
            },
            component: () => import('@/components/setting.vue')
          },
          {
            path: 'subscribe',
            name: 'subscribe',
            meta: {
              title: '订阅提醒'
            },
            component: () => import('@/components/subscribe.vue')
          }
        ]
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
