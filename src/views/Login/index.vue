<template>
  <div class="login-container">
    <van-nav-bar title="Login" />
   <van-form @submit="onSubmit" class="login-from" round>
        <van-field
          v-model="userInfo.username"
          name="username"
          placeholder="职教云用户名"
          autocomplete="off"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <div slot="label" class="label-icon"><van-icon name="user-o" /></div>
        </van-field>
        <van-field
          v-model="userInfo.password"
          type="password"
          name="password"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <div slot="label" class="label-icon"><van-icon name="bag-o" /></div>
        </van-field>
        <van-field
          v-model="userInfo.invitationCode"
          name="invitationCode"
          placeholder="邀请码（非必填项）"
          maxlength="5"
          autocomplete="off"
        >
          <div slot="label" class="label-icon">
            <van-icon name="point-gift-o" />
          </div>
        </van-field>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="#03ae84"
            >登录</van-button
          >
          <div class="right-text">
            <a
              href="https://www.icve.com.cn/commonUser/portal/resetPassword.html?dataSource=2"
              target="_blank"
              >忘记密码？</a
            >
          </div>
          <div class="login-footer">
            <van-divider>
              ©️2021&nbsp;&nbsp;<a href="https://www.cssun.cn" target="_blank"
                >louie</a
              >
            </van-divider>
          </div>
        </div>
      </van-form>
  </div>
</template>

<script>
import { isInvitationCodeExist, Login } from '@/Interface/Login.js'
export default {
  name: 'Login',
  data () {
    return {
      userInfo: {
        username: '',
        password: '',
        invitationCode: this.$route.query.invitationCode || ''
      }
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登录ing...'
      })
      if (this.userInfo.invitationCode.length <= 3) {
        this.userInfo.invitationCode = 'null'
      }
      try {
        const {
          data: { data }
        } = await Login(this.userInfo)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', data)
        this.$router.push('/user')
      } catch (error) {
        if (error.response.status === 403) {
          this.$toast.fail('登陆失败\n账号或密码错误')
        } else {
          this.$toast.fail('登陆失败\n请稍后重试')
        }
      }
      this.userInfo.invitationCode = ''
    }
  },
  watch: {
    async 'userInfo.invitationCode' (newVal) {
      if (newVal.length === 5) {
        try {
          await isInvitationCodeExist({
            invitationCode: this.userInfo.invitationCode
          })
          this.$notify({ type: 'success', message: '邀请码填写正确！' })
        } catch (error) {
          if (error.response.status === 403) {
            this.$notify({ type: 'danger', message: '邀请码填写错误！' })
          } else {
            this.$notify({ type: 'danger', message: '请求失败！' })
          }
          this.userInfo.invitationCode = ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  // background: #f1f0f0;
  .van-nav-bar {
    background: #03ae84;
  }
  /deep/ .van-nav-bar__title {
    color: white;
    font-weight: 400;
  }
  .login-from {
    padding: 30px 20px;
  }
  .login-footer {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    a {
      color: #969799;
    }
  }
  /deep/ .van-cell__title,
  .label-icon {
    width: 20px;
  }
  .right-text {
    display: flex;
    justify-content: flex-end;
    font-size: 30px;
    margin-top: 30px;
    a {
      color: #969799;
    }
  }
}
</style>
