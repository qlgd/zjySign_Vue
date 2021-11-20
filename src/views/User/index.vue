<template>
  <div class="user-container">
    <van-skeleton :row="17" :loading="loading">
    <div class="userInfo">
      <van-image
        round
        width="2rem"
        height="2rem"
        fit="cover"
        :src="user.userInfo.avatar"
      />
      <div class="user-text">
        <p>用 户 名：{{ user.userInfo.username }}</p>
        <p>用户状态：{{ user.userInfo.status == 1 ? "正常" : "封禁" }}</p>
        <p>邀 请 码：{{ user.userInfo.invitationCode }}</p>
        <div class="user-right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell :value="user.userInfo.integral">
        <div class="user_title" slot="title">
          <van-icon name="gold-coin" style="color:orange"/> 积分数
        </div>
      </van-cell>
            <van-cell :value="user.userInfo.qq?'已绑定QQ通知':'未绑定QQ通知'">
        <div class="user_title" slot="title">
    <i class="fa fa-qq" style="color:skyblue"></i> QQ
        </div>
      </van-cell>
                  <van-cell :value="user.userInfo.wxUid?'已绑定Wechat通知':'未绑定Wechat通知'">
        <div class="user_title" slot="title">
    <i class="fa fa-wechat" style="color:green"></i> Wechat
        </div>
      </van-cell>
                        <van-cell :value="signCount">
        <div class="user_title" slot="title">
    <i class="fa fa-paw" style="color:#BB4E75"></i> 签到次数
        </div>
      </van-cell>
                        <van-cell :value="invite">
        <div class="user_title" slot="title">
    <i class="fa fa-users" style="color:#8E2DE2"></i> 邀请人数
        </div>
      </van-cell>
                              <van-cell :value="timeOut">
        <div class="user_title" slot="title">
    <i class="fa fa-calendar-times-o" style="color:pink"></i> 签到到期时间
        </div>
      </van-cell>
    </van-cell-group>
    <br>
       <van-cell  @click="showShare = true" clickable >
        <div slot="title"><i class="fa fa-share-alt" style="color:blue"></i> 分享网站</div>
        </van-cell>
               <van-cell  @click="outLogin"  clickable>
        <div slot="title"><i class="fa fa-user-times" style="color:red"></i> 退出登录</div>
        </van-cell>
<van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
<van-popup v-model="isQrShow" :style="{ height: '30%', width:'50%'}"><div class="qrcode" ref="qrCodeUrl"></div></van-popup>

</van-skeleton>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { signCount, invite, getTimeOut } from '@/Interface/User.js'
import QRCode from 'qrcodejs2'
export default {
  name: 'User',
  data () {
    return {
      currentRate: 10,
      signCount: 0,
      invite: 0,
      isQrShow: false,
      showShare: false,
      timeOut: '',
      loading: true,
      count: 0,
      options: [
        { id: 1, name: '邀请链接', icon: 'link' },
        { id: 2, name: '邀请二维码', icon: 'qrcode' }
      ]
    }
  },
  async  created () {
    try {
      const { data } = await signCount()
      this.signCount = data.data
      const res = await invite()
      this.invite = res.data.data
      const res1 = await getTimeOut()
      this.timeOut = res1.data.data.stopTime
    } catch (error) {
      console.log(error)
      if (error.response.status === 403) {
        this.timeOut = '未设置签到'
      }
    }
    this.loading = false
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSelect (option) {
      this.showShare = false
      if (option.id === 1) {
        this.copyJSON('https://m.cssun.cn/#/login?invitationCode=' + this.user.userInfo.invitationCode)
      } else {
        this.isQrShow = true
        if (!this.count) {
          this.$nextTick(() => {
            this.creatQrCode()
            this.count++
          })
        }
      }
    },
    outLogin () {
      this.$dialog.confirm({
        title: '你确定要退出吗？'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push('/login')
        this.$toast.success('退出成功！')
      }).catch(error => {
        console.log(error)
      })
    },
    async copyJSON (text) {
      const target = document.createElement('input') // 创建input节点
      target.value = text // 给input的value赋值
      document.body.appendChild(target) // 向页面插入input节点
      target.select() // 选中input
      try {
        await document.execCommand('Copy') // 执行浏览器复制命令
        this.$toast.success('复制成功！')
      } catch {
        this.$toast.fail('复制失败！')
      }
      target.remove()
    },
    creatQrCode () {
      const qr = new QRCode(this.$refs.qrCodeUrl, {
        text: 'https://m.cssun.cn/#/login?invitationCode=' + this.user.userInfo.invitationCode, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      console.log(qr)
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .userInfo {
    height: 200px;
    background: #03ae84;
    display: flex;
    align-items: center;
    padding-left: 50px;
    .van-image {
      border: 1px solid white;
    }
    .user-text {
      color: white;
      font-size: 20px;
      padding-left: 50px;
    }
    .user-right {
      position: absolute;
      right: 70px;
      top: 5%;
      font-size: 30px;
    }
  }
  .van-icon-gold-coin{
    color: orange;
  }
  .user_title{
    font-size: 27px;
  }
  /deep/ .qrcode   img {
    width: 100% !important;
    height: 100% !important;
}
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
