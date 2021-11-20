import request from '@/utils/request'

export const useKey = key => request({
  method: 'DELETE',
  url: `/key/${key}`
})

export const useintegral = () => request({
  method: 'POST',
  url: '/sign'
})
