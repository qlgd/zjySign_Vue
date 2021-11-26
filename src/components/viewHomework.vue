<template>
  <div class="viewHomework">
    <div v-if="loadingShow.loading">
      <van-skeleton :row="5" title/>
      <br />
      <br />
      <br />
      <van-skeleton :row="5" title/>
    </div>
    <van-cell-group v-else>
      <p>作业列表</p>
      <van-cell
        v-for="obj in HomeworkList"
        :key="obj.Id"
        :title="obj.Title"
        :label="obj.homeworkType !== 1?'非题库作业不能查答':obj.Remark"
        is-link
        @click="onHomework(obj)"
      />
      <p>考试列表</p>
      <van-cell
        v-for="obj in OnlineExamList"
        :key="obj.Id"
        :title="obj.Title"
        :label="obj.examType!==1?'非题库考试不能查答':obj.Remark"
        is-link
        @click="onOnlineExam(obj)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import {
  getHomeworkList,
  getOnlineExamList,
  getHomeworkListAnswers,
  getOnlineExamAnswers
} from '@/Interface/Answer.js'
export default {
  name: 'viewHomework',
  props: ['couresObj'],
  data () {
    return {
      courseOpenId: '',
      openClassId: '',
      HomeworkList: [],
      OnlineExamList: [],
      loadingShow: {
        loading: true,
        loading1: true,
        loading2: true
      }
    }
  },
  created () {
    this.getHomework()
    this.getOnlineExam()
  },
  methods: {
    async getHomework () {
      try {
        const {
          data
        } = await getHomeworkList({
          courseOpenId: this.couresObj.courseOpenId,
          openClassId: this.couresObj.openClassId
        })
        this.HomeworkList = data.list
        this.courseOpenId = data.courseOpenId
        this.openClassId = data.openClassId
      } catch (error) {
        this.$notify({ type: 'danger', message: '请求数据失败' })
      }
      this.loadingShow.loading1 = false
    },
    async getOnlineExam () {
      try {
        const {
          data: { list }
        } = await getOnlineExamList({
          courseOpenId: this.couresObj.courseOpenId,
          openClassId: this.couresObj.openClassId
        })
        this.OnlineExamList = list
      } catch (error) {
        this.$notify({ type: 'danger', message: '请求数据失败' })
      }
      this.loadingShow.loading2 = false
    },
    async  onHomework (obj) {
      if (obj.homeworkType !== 1) return this.$notify({ type: 'danger', message: obj.Title + ' - 非题库作业不能查答' })
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await getHomeworkListAnswers({
          courseOpenId: this.courseOpenId,
          openClassId: this.openClassId,
          homeworkId: obj.Id
        })
        if (data instanceof Object) {
          this.$emit('getzuoye_daan', data)
          this.$toast.clear()
        } else {
          this.$toast.fail(data)
        }
      } catch (error) {
        if (error.response.status === 403) {
          this.$toast.fail('积分不足\n请充值')
        } else {
          this.$toast.fail('请求数据失败')
        }
      }
    },
    async onOnlineExam (obj) {
      if (obj.examType !== 1) return this.$notify({ type: 'danger', message: obj.Title + ' - 非题库考试不能查答' })
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await getOnlineExamAnswers({
          courseOpenId: this.courseOpenId,
          openClassId: this.openClassId,
          examId: obj.Id,
          examTimeId: obj.examTermTimeId
        })
        if (data instanceof Object) {
          this.$emit('getzuoye_daan', data)
          this.$toast.clear()
        } else {
          this.$toast.fail(data)
        }
      } catch (error) {
        if (error.response.status === 403) {
          this.$toast.fail('积分不足\n请充值')
        } else {
          this.$toast.fail('请求数据失败')
        }
      }
    }
  },
  watch: {
    loadingShow: {
      deep: true,
      handler () {
        if (!this.loadingShow.loading1 && !this.loadingShow.loading2) {
          this.loadingShow.loading = false
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.viewHomework {
  padding: 70px 25px 10px;
  [class*=van-hairline]:after{
border: none;
  }
}
</style>
