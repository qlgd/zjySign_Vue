<template>
<div class="integral-container">
  <van-divider>Tpis</van-divider>
  <van-notice-bar
  left-icon="volume-o"
  text="
2积分一个月 点击兑换即可兑换签到功能时长,积分是本站的虚拟货币，用于消费购买签到等功能。"
/>
<br>
<van-form @submit="onSubmit">
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" :loading='loading'>使用积分购买1/月签到功能</van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { useintegral } from '@/Interface/Recharge.js'
import { mapMutations } from 'vuex'
export default {
  name: 'integral',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations(['subintegral']),
    async onSubmit () {
      this.loading = true
      try {
        await useintegral()
        this.$notify({ type: 'success', message: '使用积分成功\n成功续期一个月' })
        this.subintegral(2)
      } catch (error) {
        if (error.response.status === 403) {
          this.$notify({ type: 'danger', message: '积分不足,请先购买卡密' })
        } else {
          this.$notify({ type: 'danger', message: '网络异常，请稍后重试..' })
        }
      }
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>
.integral-container{
.van-button--info{
background-color:#03ae84;
  border: none;
}
}

</style>
