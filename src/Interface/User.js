import request from '@/utils/request'

export const signCount = () => request({
  method: 'GET',
  url: '/user/sign'
})

export const invite = () => request({
  method: 'GET',
  url: '/user/invite'
})
