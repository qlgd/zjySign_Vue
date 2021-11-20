import request from '@/utils/request'

export const signNO = () => request({
  method: 'PUT',
  url: '/sign/1'
})

export const signOFF = () => request({
  method: 'PUT',
  url: '/sign/2'
})

export const getLearnningCourseList = () => request({
  method: 'GET',
  url: '/vec/getLearnningCourseList'
})

export const getClassStatus = courseId => request({
  method: 'GET',
  url: `/sign/setting/${courseId}`
})

export const settingCourseSign = data => request({
  method: 'POST',
  url: '/sign/setting',
  data
})
