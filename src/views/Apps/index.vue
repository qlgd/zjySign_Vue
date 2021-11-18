<template>
  <div class="apps-container">
    <van-nav-bar title="应用" />
    <p>职教云应用</p>
    <van-grid :column-num="4" clickable>
      <van-grid-item :to="obj.path" v-for="obj in appList" :key="obj.id">
        <i
          :class="obj.class"
          aria-hidden="true"
          slot="icon"
          style="color: skyblue"
        ></i>
        <span slot="text" class="grid-item-text">{{obj.title}}</span>
      </van-grid-item>
    </van-grid>
    <p>其它功能</p>
    <van-grid :column-num="4" clickable>
      <van-grid-item>
        <i
          class="fa fa-spinner"
          aria-hidden="true"
          slot="icon"
          style="color: skyblue"
        ></i>
        <span slot="text" class="grid-item-text">开发ing..</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'apps',
  data () {
    return {
      appList: [
        {
          id: 1,
          path: '/index/card',
          class: 'fa fa-credit-card-alt',
          title: '使用卡密'
        }, {
          id: 2,
          path: '/index/integral',
          class: 'fa fa-money',
          title: '使用积分'
        },
        {
          id: 3,
          path: '/index/setting',
          class: 'fa fa-cog',
          title: '签到设置'
        },
        {
          id: 4,
          path: '/index/subscribe',
          class: 'fa fa-lightbulb-o',
          title: '订阅提醒'
        },
        {
          id: 5,
          path: '/index/answer',
          class: 'fa fa-book',
          title: '考中查答'
        }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
.apps-container {
  .van-nav-bar {
    background: #03ae84;
    /deep/ .van-nav-bar__title {
      color: white;
    }
  }
  p {
    margin: 30px 15px;
    font-size: 35px;
  }
  .grid-item-text {
    color: darkgray;
    font-size: 25px;
    padding-top: 20px;
  }
  /deep/ [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
