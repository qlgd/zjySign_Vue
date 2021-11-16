<template>
 <div class="home-container">
<van-nav-bar :left-text='toDay' right-text='•••' />
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
