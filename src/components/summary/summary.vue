<template lang="html">
  <div class="summary">
    <g-header :title="summary.qnaireTitle"></g-header>
    <div class="summary-detail">
      <ul>
        <li>问卷发起时间：<span class="bold">{{summary.startDate}}</span></li>
        <li>问卷截止时间：<span class="bold">{{summary.endDate}}</span></li>
        <li>问卷倒数天数：<span class="bold">{{summary.backTime}}</span></li>
        <li v-if="summary.qnaireType !== 1">问卷指派人数：<span class="bold">{{summary.assignNum}}人</span></li>
        <li>问卷作答人数：<span class="bold">{{summary.doneNum}}人</span></li>
        <li v-if="summary.qnaireType !== 1">未答问卷人数：<span class="bold">{{summary.todoNum}}人</span></li>
        <li>有效问卷份数：<span class="bold">{{summary.vaildNum}}份</span></li>
      </ul>
      <div class="subject-summary">
        <div class="subject" v-for="item in summary.questionList" :key="item.id">
          第{{item.num}}题：<div v-html="item.title" style="display:inline-block"></div>
            <div v-if="item.type === 0 || item.type === 4">
              <div class="thead">
                <span>选项</span>
                <span>人数</span>
                <span>比例</span>
              </div>
              <div class="tbody">
                <div class="subject-content" v-for="obj in item.optionList">
                  <span v-html="obj.title"></span>
                  <span>{{obj.selectNum}}</span>
                  <mt-progress :value="parseInt(obj.selectPercent)" :bar-height="6" class="percent"><div slot="end">{{obj.selectPercent}}</div></mt-progress>
                </div>
              </div>
              <div class="doneNum">作答人数：{{item.vaildFillNum}}人</div>
            </div>

            <div v-if="item.type === 2">
              <div class="thead">
                <span>标题</span>
                <span>人数</span>
                <span>操作</span>
              </div>
              <div class="tbody">
                <div class="subject-content" style="line-height: 0.9rem">
                  <span v-html="item.title"></span>
                  <span>{{item.answerNum}}</span>
                  <router-link :to="{ name: 'answerDetail', params: {id: item.id} }" style="flex: 1; text-align:center;color:#64aad5">查看</router-link>
                </div>
              </div>
              <div class="doneNum">作答人数：{{item.vaildFillNum}}人</div>
            </div>

            <div v-if="item.type === 3">
              <div class="thead">
                <span>分数项</span>
                <span>总分</span>
                <span>平均分</span>
              </div>
              <div class="tbody">
                <div class="subject-content" v-for="obj in item.optionList">
                  <span v-html="obj.title"></span>
                  <span>{{obj.totalScore}}</span>
                  <span>{{obj.avgScore}}</span>
                </div>
              </div>
              <div class="doneNum">作答人数：{{item.vaildFillNum}}人</div>
            </div>
        </div>
      </div>
    </div>
    <paper-op :item="summary" :callback="getPaperSummary" v-if="$route.params.type == 1"></paper-op>
  </div>
</template>

<script>
import gHeader from 'components/base/header/header'
import api from 'api/url'
import paperOp from 'components/base/paper-op/paper-op'

export default {
  data() {
    return {
      summary: {},
      isSummary: true
    }
  },
  methods: {
    getPaperSummary() {
      api.getPaperSummary({
        id: this.$route.params.id
      }).then((data) => {
        if (data.resultCode === 'SUCCESS') {
          this.summary = data.data;
          this.summary.editing = false;
        }
      })
    },
  },
  mounted() {
    this.getPaperSummary()
  },
  components: {
    gHeader,
    paperOp
  }
}
</script>

<style lang="css">
.summary {
  height: 100%;
  background: white;
  font-size: 0.7rem;
}
.summary-detail{
  padding: 2.5rem 0;
}
.summary ul{
  /*width: 72%;*/
  margin: 1rem 0 2rem 2.45rem;
  list-style: none;
}
.summary ul li {
  line-height: 1.4rem;
  color: #999;
}

.bold {
  color: #232323;
}
.subject-summary {
  padding: 0 1.6rem;
}
.subject {
  font-size: 0.7rem;
  color: #232323;
  margin-bottom: 1rem;
}
.thead {
  display: flex;
  margin: 0.5rem 0;
  font-size: 0.7rem;
  color: #999;
}
.thead span {
  flex: 1;
  text-align: center;
}
.tbody {
  border: 1px solid #e5e5e5;
  padding: 0 0.5rem;
}
.percent {
  flex: 1
}
.tbody .subject-content {
  display: flex;
  margin: 0.5rem 0;
  line-height: 1.5rem;
}
.tbody div span{
  flex: 1;
  text-align: center;
}
.doneNum {
  text-align: right;
  margin-top: 0.25rem;
  color: #999;
  font-size: 0.7rem;
}
.mt-progress-progress {
  border-radius: 40px;
}
</style>
