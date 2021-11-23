import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// // Thu Dec 20 1990 00:00:00 GMT+0800 (中国标准时间)
// const day = dayjs('Thu Dec 20 1990 00:00:00 GMT+0800 (中国标准时间)').format('YYYY-MM-DD') // '25/01/2019'
// console.log(day)
// console.log(dayjs('1643500800000').format('YYYY-MM-DD'))
// 配置使用中文语言包
// Vue.filter('updateTime', value => dayjs(value).format('YYYY-MM-DD'))
dayjs.locale('zh-cn')
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => dayjs().to(dayjs(value)))
