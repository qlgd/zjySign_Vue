<template>
 <div class="home-container">
<van-nav-bar :left-text='toDay' right-text='•••' />
本站自动签到程序采用分布式运行.安全稳定快速
使用步骤：
1.使用卡密
2.使用积分
3.设置签到
4.邀请人免费得2积分，也就是一个月自动签到权限。
5.不想邀请人也可以选择钞能力，2块钱10积分 联系QQ：3403106098
本站采用前后端分离(springboot,redis)，源码包搭建包更新
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState(['user']),
    toDay () {
      const Now = new Date()
      const Hour = Now.getHours()
      if (Hour < 6) { return `凌晨好！${this.user.userInfo.username}` } else if (Hour < 9) { return `早上好！${this.user.userInfo.username}` } else if (Hour < 12) { return `上午好！${this.user.userInfo.username}` } else if (Hour < 14) { return `中午好！${this.user.userInfo.username}` } else if (Hour < 17) { return `下午好！${this.user.userInfo.username}` } else if (Hour < 19) { return `傍晚好！${this.user.userInfo.username}` } else if (Hour < 22) { return `晚上好！${this.user.userInfo.username}` } else { return `夜里好！${this.user.userInfo.username}` }
    }
  }
}
</script>

<style lang='less' scoped>
.home-container{
  .van-nav-bar{
    background: #03ae84;
 /deep/   .van-nav-bar__text{
      color: white;
    }
  }
}
</style>
