<template>
  <div class="zy_daan" v-if="list">
    <van-cell-group>
      <van-cell
        :value="questionType(obj.questionType)"
        v-for="(obj, index) in list"
        :key="index"
      >
        <div slot="label">
          <div v-if="obj.questionType === 2 || obj.questionType === 1">
            答案：
            <van-tag
              plain
              type="primary"
              v-for="option in obj.questionInfo.optionList"
              class="span-text"
              :key="option.questionId"
            >
              <span v-html="option.Content"></span>
              <van-icon name="success" v-if="option.IsAnswer === 'True'" />
              <van-icon name="cross" v-else color="red" />
            </van-tag>
          </div>
          <div v-else-if="obj.questionType === 5">
            答案：<br /><br />
            <van-tag
              plain
              type="primary"
              v-for="(option, index) in obj.questionInfo.optionList"
              class="span-text"
              :key="option.questionId"
            >
              <span
                v-html="'第' + (index + 1) + '题：' + option.Content"
              ></span>
            </van-tag>
          </div>
          <div v-else-if="obj.questionType === 6">
            答案：<br /><br />
            <van-tag plain type="primary" class="span-text">
              <span v-html="obj.questionInfo.questionAnswer"></span>
            </van-tag>
          </div>
          <div v-else-if="obj.questionType === 3">
            答案：
            <van-tag
              v-if="obj.questionInfo.questionAnswer !== '0'"
              plain
              type="primary"
              class="span-text"
            >
              <span>正确</span>
            </van-tag>
            <van-tag v-else plain type="primary" class="span-text">
              <span>错误</span>
            </van-tag>
          </div>
        </div>
        <div slot="title">
          <p v-html="questionTitle(obj.questionInfo.questionTitle)"></p>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
  <div v-else>未在作答时间</div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      answerArr: []
    }
  },

  methods: {
    questionType (type) {
      switch (type) {
        case 1:
          return '单选题'
        case 2:
          return '多选题'
        case 5:
          return '填空题(主观)'
        case 3:
          return '判断题'
        case 6:
          return '问答题'
        default:
          return '暂不支持的题型'
      }
    },
    questionTitle (text) {
      return text.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        function (match, capture) {
          return `<img src='${'https://zjy2.icve.com.cn' + capture}'/>`
        }
      )
    }
  }
}
</script>

<style lang='less' scoped>
.zy_daan {
  padding: 70px 25px 10px;
  [class*="van-hairline"]:after {
    border: none;
  }
  .span-text {
    margin-right: 10px;
  }
}
</style>
