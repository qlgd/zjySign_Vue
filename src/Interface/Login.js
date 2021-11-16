import request from '@/utils/request'

export const isInvitationCodeExist = params => request({
  method: 'GET',
  url: `/auth/isInvitationCodeExist/${params.invitationCode}`
})

export const Login = data => request({
  method: 'POST',
  url: '/auth/token',
  data
})
