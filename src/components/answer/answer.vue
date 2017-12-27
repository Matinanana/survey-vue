<template lang="html">
  <div class="container">
  	<div ref="gheader" class="header-item">
  		<g-header :title="title" :url="backUrl"></g-header>  		
  	</div>
	  <scroll ref="scroll" :data="datalist" class="answer-list">
	  	<div @touchstart="onTouchStart" ref="listsc"
    		@touchmove="onTouchMove"
    		@touchend="onTouchEnd">
	  		<div class="list-item"></div>
	      <a :href="getAnswerUrl(item.id)" class="list" v-for="item in datalist">
	          <div class="time">
	            <span v-if="type == 3">截止时间：{{item.endDate}}</span>
	            <span v-else>回答时间：{{item.answerTime}}</span>
	          </div>
	          <div class="box">
	              <span v-if="type == 3">{{item.title}}</span>
	              <span v-else>{{item.qnTitle}}</span>
	          </div>
	      </a>
			<empty v-show="!datalist.length"></empty>
	 		</div>
		</scroll>
  </div>
</template>

<script>
import gHeader from 'components/base/header/header'
import empty from 'components/base/empty/empty'
import api from 'api/url'
import scroll from 'components/base/scroll/scroll'

export default {
  data(){
    return {
    	touch:{},
      title: '',
      datalist: [],
      baseAnswerUrl: '',
      type: '',
      backUrl: {path: '/category'},
      params: {
        pageNo: 1
      }
    }
  },
  methods: {
  	onTouchStart(e){//记录当前y轴值
  		let firstTouch=e.touches[0]
			this.touch.y1=firstTouch.pageY
  	},
  	onTouchMove(e){//计算滚动位置
  		let listsc=this.$refs.listsc.offsetHeight
  		let scroll=this.$refs.scroll.$el.offsetHeight
  		let firstTouch=e.touches[0]
			this.touch.y2=firstTouch.pageY
			let delta=Math.min(0,Math.max(-60,this.touch.y2-this.touch.y1))
			if(scroll<listsc){
				this.$refs.gheader.style.transform=`translateY(${delta}px)`
				this.$refs.gheader.style.transition=`transform 1s`
			}
//			console.log(delta)
  	},
  	onTouchEnd(e){
  		let listsc=this.$refs.listsc.offsetHeight
  		let scroll=this.$refs.scroll.$el.offsetHeight
			let delta=this.touch.y2-this.touch.y1
			if(scroll<listsc){
				if(delta>0){
					this.$refs.gheader.style.transform=`translateY(0px)`
				}else{
					this.$refs.gheader.style.transform=`translateY(-60px)`
				}
		//		console.log(delta)
			}
  	},
    getAnswerUrl(id) {
      let url = '';
      if (this.type == 3) {
        url = this.baseAnswerUrl + encodeURIComponent(window.btoa(id)) + '&type=3';
      } else {
        url = this.baseAnswerUrl + id + '&userId=' + localStorage.getItem('userId') + '&type=4'
      }
      return url;
    },
    getAnswerList() {
//    this.loading = true;
      if (this.type == 3) {
        api.getAnswerList(this.params).then((data) => {
          if (data.resultCode === 'SUCCESS') {
            let res = data.data || {};
            // this.datalist = res.qnaireList;
            this.datalist = this.datalist.concat(res.qnaireList);
//          this.loading = false;
          }
        })
      } else {
        api.getUserAnswerList(this.params).then((data) => {
          if (data.resultCode === 'SUCCESS') {
            let res = data.data || {};
            this.datalist = this.datalist.concat(res.answerRecordList);
//          this.loading = false;
          }
        })
      }
    },
    loadMore() {
      this.params.pageNo++;
      this.getAnswerList()
    }
  },
  components: {
    gHeader,
    empty,
    scroll
  },
  mounted() {
    this.type = this.$route.params.type || 3;
    if (this.type == 3) {
      this.title = '待回答';
      this.params.status = this.type;
      this.baseAnswerUrl = '/views/ques/answer.html?id='
    } else {
      this.title = '已回答';
      delete this.params.status;
      this.baseAnswerUrl = '/views/ques/answerdet.html?id='
    }
    this.getAnswerList()
  }
}
</script>

<style lang="css">
.container {
	width: 100%;
	position:fixed;
	top: 1px;
	bottom: 0px;
  background-color: #dddddd;
}
.header-item{
	position: fixed;
	width: 100%;
	height: 2.5rem;
	z-index: 10;	
}
.answer-list {
	height: 100%;
	overflow: hidden;
}
.list-item{
	height: 2.5rem;
}
.list {
	/*width: 100%;*/
  background-color: white;
  border-top: 1px solid #e5e5e5;
  height: 4.6rem;
  display: block;
  text-decoration: none;
}

.list:hover {
  /*background-color1: #f5f5f5;*/
}

.time {
  color: #999999;
  font-size: 0.7rem;
  text-align: right;
  position: relative;
  top: 3.05rem;
  margin-right: 1.5rem;
}

.line {
  background-color: white;
  margin: 0 auto;
  width: 100%;
  height: 1px;
}

.box {
  margin: 0 1.5rem;
  margin-top: 0px;
  font-size: 0.8rem;
}
</style>
