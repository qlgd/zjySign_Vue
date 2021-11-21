<template>
<div class="subscribe-container">
<van-tabs v-model="active">
  <van-tab>
    <div slot="title">
      <i class="fa fa-qq" style="color:skyblue"></i> QQ订阅
    </div>
    <br>
  <van-notice-bar ref="tips1"
  left-icon="volume-o"
  text="设置好你的QQ号码,加入官方QQ群(201129019)接收机器人的@提醒"
/>
<br>
<van-form @submit="onSubmit">
  <van-field
    v-model="qq"
    name="qq"
    label="QQ"
    placeholder="请输入你要订阅的QQ号码"
    :rules="[{ required: true, message: '请填写QQ' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" :loading="loading">订阅</van-button>
  </div>
</van-form>
  </van-tab>
  <van-tab >
    <div slot="title">
      <i class="fa fa-wechat" style="color:green"></i> Wechat订阅
    </div>
      <van-notice-bar ref="tips2"
  left-icon="volume-o"
  text="先保存该二维码，使用微信扫描订阅公众号获取提醒"
/>
    <div class="qr-img">
<van-image
  width="10rem"
  height="10rem"
  fit="cover"
  :src="imgUrl"
/>
    </div>

  </van-tab>
</van-tabs>
</div>
</template>

<script>
import { setQQMsg, getWxQrcode } from '@/Interface/subscribe.js'
export default {
  name: 'subscribe',
  data () {
    return {
      active: 0,
      qq: '',
      imgUrl: '',
      loading: false
    }
  },
  created () {
    this.getQrcode()
  },
  watch: {
    active () {
      this.$refs.tips1.reset()
      this.$refs.tips2.reset()
    }
  },
  methods: {
    async onSubmit ({ qq }) {
      this.loading = true
      try {
        await setQQMsg(qq)
        this.$notify({ type: 'success', message: 'QQ订阅成功！\n加群才能获取提醒' })
      } catch (error) {
        this.$notify({ type: 'danger', message: '订阅失败\n请稍后重试！' })
      }
      this.loading = false
    },
    async  getQrcode () {
      try {
        const { data } = await getWxQrcode()
        this.imgUrl = 'https://api.vvhan.com/api/qr?text=' + data.data.url
      } catch (error) {
        this.$notify({ type: 'danger', message: '获取资源失败\n请稍后重试！' })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.subscribe-container{
/deep/ .van-tabs__line {
 background: #969799 ;
 }
 .van-button--info {
background-color: #03ae84;
    border: none
}
.qr-img{
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

 }
</style>
