<template>
  <div class="setting-container">
    <van-skeleton :row="15" v-if="loading" />
    <van-empty
      image="error"
      description="请先使用积分后再使用自动签到功能"
      v-else-if="isShowErr"
    />
    <div v-else>
      <van-cell-group clickable>
        <van-cell v-for="obj in courseList" :key="obj.Id" @click="clickCourse(obj)">
          <template #title>
            <van-image
              width="150px"
              height="100px"
              fit="contain"
              :src="obj.thumbnail"
            />
          </template>
          <div slot="right-icon" class="cell-text">
            <p class="van-multi-ellipsis--l2">{{ obj.assistTeacherName }}--{{ obj.courseName }}</p>
            <p></p>
            <p v-if="obj.status == 1">
<van-tag type="success" color="#03ae84">自动签到开启中</van-tag>
            </p>
            <p v-else><van-tag type="danger" >自动签到已关闭</van-tag></p>
            <p v-show="obj.status==1">
              <van-tag plain type="primary" color="#03ae84" text-color="#03ae84">{{
                "延迟" + obj.delay + "秒"
              }}</van-tag></p>
          </div>
        </van-cell>
      </van-cell-group>
      <van-popup v-model="show" position="top" :style="{ height: '50%'}"  >
      <br>
      <p style="text-align:center">{{courseItem.courseName}}</p>
<van-cell title="自动签到开关" icon="shop-o">
  <template #right-icon>
    <van-switch v-model="courseItem.checked"  :loading='courseItem.loading' active-color='#03ae84' @change="onChangeDelay" />
  </template>
</van-cell>
<div v-show="courseItem.checked">
 <span class="span-text"><van-icon name="flag-o" />延迟秒数：</span>
<div class="slider-box">
  <van-slider v-model="courseItem.delay" @change="onChangeDelay"  :min="0" :max="500" :step="10" >
      <template #button>
    <div class="custom-button">{{ courseItem.delay}}s</div>
  </template>
  </van-slider>
</div>
</div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import {
  signNO,
  getLearnningCourseList,
  getClassStatus,
  settingCourseSign
} from '@/Interface/Sign.js'
export default {
  name: 'setting',
  data () {
    return {
      loading: true,
      isShowErr: false,
      courseList: [],
      show: false,
      courseItem: {
        checked: false,
        courseId: '',
        courseName: '',
        delay: 0,
        status: 0,
        loading: false
      }
    }
  },
  created () {
    this.oneSignNo()
    this.getCourseList()
  },
  methods: {
    async oneSignNo () {
      try {
        await signNO()
      } catch (error) {
        if (error.response.status === 403) {
          this.isShowErr = true
        } else {
          this.$notify({ type: 'danger', message: '网络错误' })
        }
        this.loading = false
      }
    },
    async getCourseList () {
      try {
        const {
          data: { courseList }
        } = await getLearnningCourseList()
        this.courseList = courseList
        this.courseList.forEach((obj) =>
          this.getClassStatusFn(obj.courseOpenId)
        )
      } catch (error) {
        this.$notify({ type: 'danger', message: '网络错误' })
      }
    },
    async getClassStatusFn (courseId) {
      try {
        const {
          data: { data }
        } = await getClassStatus(courseId)
        const courseObj = this.courseList.find(item => item.courseOpenId === data.courseId)
        this.$set(courseObj, 'delay', data.delay)
        this.$set(courseObj, 'status', data.status)
      } catch (error) {
        this.$notify({ type: 'danger', message: '网络错误' })
      }
      this.loading = false
    },
    async   onChangeDelay () {
      this.courseItem.loading = true
      if (this.courseItem.checked) {
        this.courseItem.status = 1
      } else {
        this.courseItem.status = 2
      }
      try {
        await settingCourseSign({
          courseId: this.courseItem.courseId,
          courseName: this.courseItem.courseName,
          delay: this.courseItem.delay,
          status: this.courseItem.status
        })
        const i = this.courseList.findIndex(obj => obj.courseOpenId === this.courseItem.courseId)
        this.$set(this.courseList[i], 'delay', this.courseItem.delay)
        this.$set(this.courseList[i], 'status', this.courseItem.status)
      } catch (error) {
        this.$notify({ type: 'danger', message: '网络错误' })
      }
      this.courseItem.loading = false
    },
    clickCourse (obj) {
      this.show = true
      this.courseItem.courseName = obj.courseName
      this.courseItem.courseId = obj.courseOpenId
      this.courseItem.delay = obj.delay || 0
      this.courseItem.status = obj.status
    }
  },
  watch: {
    'courseItem.status': function (val) {
      val === 1 ? this.courseItem.checked = true : this.courseItem.checked = false
    }
  }
}
</script>

<style lang='less' scoped>
.setting-container {

 /deep/ .van-hairline--top-bottom{
padding-bottom: 100px !important;
  }
  .van-cell {
    align-items: center;
    /deep/ .van-image__img {
      border-radius: 5%;
      box-shadow: rgba(0, 0, 0, 0.2) 0 1px 5px 0px;
    }
    .cell-text {
      flex: 1;
      p {
        margin: 5px 0;
      }
    }

  }
        .span-text{
        font-size: 20px;
        padding: 30px;
      }
     .slider-box{
      padding: 50px ;
    }
 .custom-button {
    width: 66px;
    color: #fff;
    font-size: 20px;
    line-height: 48px;
    text-align: center;
    background-color: #03ae84;
    border-radius: 100px;
  }
 /deep/ .van-slider__bar{
    background: #03ae84;
  }
    }

</style>
