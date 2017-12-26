<template lang="html">
  <div class="answer-detail">
    <g-header :title="title"></g-header>
    <table border="1">
      <thead>
        <tr>
          <th>用户名</th>
          <th>手机</th>
          <th>内容</th>
          <th>回答时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="datalist.length > 0" v-for="item in datalist">
          <td>{{item.userName}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.content}}</td>
          <td>{{item.answerTime}}</td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import gHeader from 'components/base/header/header'
import api from 'api/url'
export default {
  data() {
    return {
      datalist: [],
      title: '回答题',
      id: '',
    }
  },
  mounted() {
    api.getAnswerDetail({
      questionId: this.id
    }).then((data) => {
      if (data.resultCode === 'SUCCESS') {
        let res = data.data || {};
        this.datalist = res.answeredUserList;
        this.title = res.questionTitle;
      }
    })
  },
  created() {
    this.id = this.$route.params.id;
  },
  components: {
    gHeader
  }
}
</script>

<style lang="css">
.answer-detail {
  background: white;
  height: 100%;
}
.answer-detail table {
  width: 88%;
  padding-top: 3.5rem;
  margin: 1.5rem 1.5rem 0;
}
thead {
  border-bottom: 1px solid #ccc;
}
thead tr {
  font-size: 14px;
}
thead tr th {
  width: 25%;
}
tbody tr{
  font-size: 12px;
  text-align: center;
}
</style>
