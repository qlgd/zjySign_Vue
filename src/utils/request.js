import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'https://res.cssun.cn',
  timeout: 5000
})

request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.authorization) {
    config.headers.Authorization = `Bearer ${user.authorization}`
  }
  return config
})

request.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    store.commit('setUser', null)
    router.push({ path: '/login' })
    Toast.fail('登陆已过期\n请重新登陆')
  }
  return Promise.reject(error)
})

export default request
