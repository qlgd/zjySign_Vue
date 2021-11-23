<template>
<div class="answer-container">
<loadingTemalate  v-if="loading"/>
<div v-else>
        <van-cell-group>
        <van-cell
          v-for="obj in courseList"
          :key="obj.Id"
          @click="clickCourse(obj)"
        >
          <template #title>
            <van-image
              width="150px"
              height="100px"
              fit="contain"
              :src="obj.thumbnail"
            />
          </template>
          <div slot="right-icon" class="cell-text">
             <p class="van-multi-ellipsis--l2">
              {{ obj.assistTeacherName }}--{{ obj.courseName }}
            </p>
          </div>
        </van-cell>
      </van-cell-group>
</div>
<van-popup v-model="is_popupShow" round position="bottom" :style="{ height: '95%' }" :closeable='true'>
  <viewHomework :couresObj='couresObj' v-if='is_popupShow'/>
</van-popup>
</div>
</template>

<script>
import {
  getLearnningCourseList
} from '@/Interface/Sign.js'
import loadingTemalate from '@/components/loadingTemplate'
import viewHomework from '@/components/viewHomework'
export default {
  name: 'answer',
  components: {
    loadingTemalate,
    viewHomework
  },
  created () {
    this.getCourseList()
  },
  data () {
    return {
      loading: true,
      courseList: [],
      is_popupShow: false,
      couresObj: {}
    }
  },
  methods: {
    async getCourseList () {
      try {
        const {
          data: { courseList }
        } = await getLearnningCourseList()
        this.courseList = courseList
      } catch (error) {
        this.$notify({ type: 'danger', message: '网络错误' })
      }
      this.loading = false
    },
    clickCourse (obj) {
      this.is_popupShow = true
      this.couresObj = obj
    }
  }
}
</script>

<style lang='less' scoped>
.answer-container{
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
  .span-text {
    font-size: 20px;
    padding: 30px;
  }
}
</style>
