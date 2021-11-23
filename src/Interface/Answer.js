import request from '@/utils/request'

// 作业答案
export const getHomeworkListAnswers = data => request({
  method: 'POST',
  url: '/vec/getHomeworkListAnswers',
  data
})

// 考试答案
export const onlineExamAnswers = data => request({
  method: 'POST',
  url: '/vec/onlineExamAnswers',
  data
})

//  作业列表
export const getHomeworkList = params => request({
  method: 'GET',
  url: `/vec/getHomeworkList/${params.courseOpenId}/${params.openClassId}`
})

// 考试列表
export const getOnlineExamList = params => request({
  method: 'GET',
  url: `/vec/getOnlineExamList/${params.courseOpenId}/${params.openClassId}`
})
