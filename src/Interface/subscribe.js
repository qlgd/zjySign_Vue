import request from '@/utils/request'

export const setQQMsg = qq => request({
  method: 'POST',
  url: `/user/qq/${qq}`
})

export const getWxQrcode = () => request({
  method: 'GET',
  url: '/user/wxPusherQRCode'
})
