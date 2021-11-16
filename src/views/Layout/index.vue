<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar active-color="#03ae84" inactive-color="#000" route>
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
       <van-tabbar-item icon="point-gift" to="/apps">应用</van-tabbar-item>
      <van-tabbar-item icon="manager" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang='less' scoped>
</style>
