import request from '@/utils/request'

export const useKey = params => request({
  method: 'GET',
  url: `/ley/${params.key}`
})

export const useintegral = () => request({
  method: 'GET',
  url: '/sign'
})
