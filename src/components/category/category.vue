<template lang="html">
  <div class="main_content">
    <g-header :show-back="showBack"></g-header>
    <div class="main_link" v-if="!isStudent">
        <div class="main_ap">
          <router-link class="link" :to="{name: 'publish', params: {type: 1}}">
              <img src="./pid_Alreadypublished.png" class="main_img">
              <img src="./icon_in.png" class="main_icon">
            </router-link>
        </div>
    </div>
    <div class="main_link" v-if="!isStudent">
        <div class="main_rec">
          <router-link class="link" :to="{name: 'publish', params: {type: 2}}">
            <img src="./pic_Recovered.png" class="main_img">
            <img src="./icon_in.png" class="main_icon">
          </router-link>
        </div>
    </div>
    <div class="main_link" style="position: relative" :class="{'padding-fix': isStudent}">
      <div class="num" v-if="num !== 0">{{num}}</div>
        <div class="main_tob">
            <router-link class="link" :to="{name: 'answer', params: {type: 3}}">
              <!-- <div class="wrapper">
                <img src="./answering-pen.png" class="pen">
                <div class="num" v-if="num !== 0">{{num}}</div>
                </div>
                <img src="./answering.png" class="answering"> -->

                <img src="./pic_Tobeanswered.png" class="main_img">
                <img src="./icon_in.png" class="main_icon">
            </router-link>
        </div>
    </div>
    <div class="main_link">
          <div class="main_ans">
            <router-link class="link" :to="{name: 'answer', params: {type: 4}}">
                <img src="./pic_Answered.png"  class="main_img">
                <img src="./icon_in.png" class="main_icon">
            </router-link>
          </div>
      </div>

    <footer>恒峰问卷调查系统</footer>

  </div>
</template>

<script>
import gHeader from 'components/base/header/header'
import api from 'api/url'
export default {
  data() {
    return {
      showBack: false,
      num: null,
      isStudent: null,
    }
  },
  methods: {
    getTodoCount() {
      api.getTodoCount().then((data) => {
        if (data.resultCode === 'SUCCESS') {
          let res = data.data || {};
          this.num = res.todoQnaireCount;
        }
      })
    }
  },
  components: {
    gHeader
  },
  mounted() {
    this.isStudent = JSON.parse(localStorage.getItem('isStudent')).isStudent;
    this.getTodoCount()
  }
}
</script>

<style lang="css">
#app {
  height: 100%;
  background-color: #dddddd;
}

.link {
  display: block;
  width: 100%;
  text-decoration: none;
}
.main_content {
    width: 100%;
    padding-top: 2.5rem;
    background-color: #ffffff;
}
.main_link {
    width: 100%;
}
.main_link:hover{
    background-color: #f5f5f5;
}

.main_ap:hover,
.main_rec:hover,
.main_tob:hover,
.main_ans:hover{
    background-color: #f5f5f5;
}
.main_ap .main_img,
.main_rec .main_img,
.main_tob .main_img,
.main_ans .main_img{
    height: 55%;
    margin-top: 3%;
    margin-left: 6%;
    margin-bottom: 3%;
    position: relative;
    top: 0.3rem;
}
.main_ap .main_img {
  width: 44%
}
.main_rec .main_img,
.main_ans .main_img{
    width: 34%;
}
.main_tob .main_img {
  width: 38%
}
.pen {
  height: 2rem;
}
.answering {
  width: 21%;
  margin-left: -2%;
}
.wrapper {
  display: inline-block;
  position: relative;
  width: 24%;
  text-align: center;
}
.num {
  border-radius: 10px;
  color: white;
  background: red;
  width: 18px;
  height: 18px;
  position: absolute;
  /* top: -3px;
  right: 14%; */
  left: 19%;
  font-size: 12px;
  text-align: center;
  line-height: 0.95rem;
}

.main_tob {
  line-height: 4.15rem;
}

.main_ap, .main_rec, .main_tob, .main_ans {
  width: 92%;
  height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  /* border-bottom: 1px solid #e5e5e5; */
}

.main_ap {
  margin-top: 5%;
}

.main_icon {
  width: 2%;
  height: 25%;
  vertical-align: 1.5rem;
  float: right;
  margin-top: 7%;
  margin-right: 6%;
}

@media screen and (max-width: 700px) and (orientation: portrait) {
  .main_link {
    height: 4.15rem;
  }
}

@media screen and (max-width: 700px) and (orientation: landscape) {
  .main_link {
    height: 5.15rem;
  }
}

@media screen and (min-width: 700px) and (orientation: portrait) {
  .main_link {
    height: 8.15rem;
  }
  .num {
    top: 10%;
    font-size: 17px;
    width: 25px;
    height: 25px;
    line-height: 1.15rem
  }
}

@media screen and (min-width: 700px) and (orientation: landscape) {
  .main_link {
    height: 10.15rem;
  }
  .num {
    top: 10%;
    font-size: 17px;
    width: 25px;
    height: 25px;
    line-height: 1.15rem
  }
}

.padding-fix {
  padding-top: 4%;
}

footer{
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: #999999;
  position: fixed;
  bottom: 10px;
}

</style>
