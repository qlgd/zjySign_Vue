<template>
  <div class="loading-container">
          <van-skeleton
      :row="2"
      title
      avatar
      avatar-shape="shape"
      avatar-size="100px"
    />
    <van-skeleton
      :row="2"
      title
      avatar
      avatar-shape="shape"
      avatar-size="100px"
    />
    <van-skeleton
      :row="2"
      title
      avatar
      avatar-shape="shape"
      avatar-size="100px"
    />
        <van-skeleton
      :row="2"
      title
      avatar
      avatar-shape="shape"
      avatar-size="100px"
    />
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang='less' scoped>
.loading-container{
  .van-skeleton {
    padding: 30px;
  }
}
</style>
