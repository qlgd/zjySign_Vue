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
        :label="obj.Remark"
        is-link
      />
      <p>考试列表</p>
      <van-cell
        v-for="obj in OnlineExamList"
        :key="obj.Id"
        :title="obj.Title"
        :label="obj.Remark"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getHomeworkList, getOnlineExamList } from '@/Interface/Answer.js'
export default {
  name: 'viewHomework',
  props: ['couresObj'],
  data () {
    return {
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
          data: { list }
        } = await getHomeworkList({
          courseOpenId: this.couresObj.courseOpenId,
          openClassId: this.couresObj.openClassId
        })
        this.HomeworkList = list
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
  padding: 100px 25px 10px;
}
</style>
