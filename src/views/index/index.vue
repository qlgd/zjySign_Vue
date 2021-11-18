<template>
  <div class="index-container">
      <van-nav-bar
  :title="title"
  left-text="返回"
  left-arrow
  @click-left="$router.push('/apps')"
/>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      title: this.$route.meta.title
    }
  }
}
</script>

<style lang='less' scoped>
.index-container{
  .van-nav-bar {
    background: #03ae84;
  }
  /deep/ .van-nav-bar__title {
    color: white;
    font-weight: 400;
  }
 /deep/ .van-nav-bar__text{
      color: white;
  }
}
/deep/ .van-nav-bar .van-icon {
     color: white;
}
</style>
