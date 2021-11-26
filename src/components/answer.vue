<template>
<div class="answer-container">
<loadingTemalate  v-if="loading"/>
<div v-else>
  <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
查答案2积分一次，请注意,答案没出来不扣积分
</van-notice-bar>
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
  <viewHomework :couresObj='couresObj' v-if='is_popupShow' @getzuoye_daan='getzuoye_daan'/>
</van-popup>
<van-popup v-model="is_zy_daan_Show" round position="bottom" :style="{ height: '95%' }" :closeable='true'>
<answers  :list='HomeworkAnswerList' v-if="is_zy_daan_Show" />
</van-popup>
</div>
</template>

<script>
import {
  getLearnningCourseList
} from '@/Interface/Sign.js'
import loadingTemalate from '@/components/loadingTemplate'
import viewHomework from '@/components/viewHomework'
import answers from '@/components/answers'
import { mapMutations } from 'vuex'
export default {
  name: 'answer',
  components: {
    loadingTemalate,
    viewHomework,
    answers
  },
  created () {
    this.getCourseList()
  },
  data () {
    return {
      loading: true,
      courseList: [],
      is_popupShow: false,
      is_zy_daan_Show: false,
      couresObj: {},
      HomeworkAnswerList: []
    }
  },
  methods: {
    ...mapMutations(['subintegral']),
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
    },
    getzuoye_daan (data) {
      this.is_popupShow = false
      this.HomeworkAnswerList = data
      this.is_zy_daan_Show = true
      this.$notify({ type: 'success', message: '查答扣除2积分' })
      this.subintegral(2)
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
