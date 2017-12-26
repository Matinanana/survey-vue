<template lang="html">
  <div class="publish">
    <g-header :title="title"></g-header>
    <!-- <div v-if="datalist.length > 0" :style="{ height: wrapperHeight + 'px' }" style="-webkit-overflow-scrolling: auto" ref="wrapper"> -->
      <!-- <mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
    <scroll class="publish-list" :data="datalist" :pulldown="pulldown" @pulldown="loadData()">
    	<div>
    		<div class="publish-list-item"></div>
	      <!--<router-link class="item" v-for="(item, index) in datalist" :key="item.id" :to="{name: 'summary', params: {id: item.id, type: $route.params.type}}">-->
	      <router-link class="item" v-for="(item, index) in datalist" :key="index" :to="{name: 'summary', params: {id: item.id, type: $route.params.type}}">
	        <div class="item-head">
	          <img src="./info.png" alt="">
	          <div class="info">
	            <p>问卷信息</p>
	            <p>{{item.startDate}}</p>
	          </div>
	        </div>
	        <div class="item-title">
	          {{item.qnaireTitle}}
	        </div>
	        <div class="item-detail" :class="{'item-padding' : $route.params.type == 2}">
	          <ul>
	            <li>问卷发起时间：{{item.startDate}}</li>
	            <li>问卷截止时间：{{item.endDate}}</li>
	            <li v-if="item.qnaireType !== 1 && item.really !== 1">问卷指派人数：{{item.assignNum}}人</li>
	            <li>问卷作答人数：{{item.doneNum}}人</li>
	            <li v-if="item.qnaireType !== 1 && item.really !== 1">未答问卷人数：{{item.todoNum}}人</li>
	            <li>有效问卷份数：{{item.vaildNum}}份</li>
	          </ul>
	        </div>
	        <paper-op :item="item" :callback="refresh" :isFixedBottom="isFixedBottom" v-if="$route.params.type == 1" @time-changed="changeTime"></paper-op>
	      </router-link>
	      <mt-datetime-picker ref="datetime" type="datetime" v-model="datetime" :start-date="now" @confirm="confirmDatetime"></mt-datetime-picker>
	      <!-- </mt-loadmore> -->
      </div>
    </scroll>
    <empty v-show="!datalist.length"></empty>
  </div>
</template>

<script>
import api from 'api/url'
import util from 'utils/index'
import gHeader from 'components/base/header/header'
import empty from 'components/base/empty/empty'
import paperOp from 'components/base/paper-op/paper-op'
import scroll from 'components/base/scroll/scroll'
import {
  MessageBox
} from 'mint-ui'

export default {
  data() {
    return {
      datalist: [],
      pulldown:true,
      title: '已发布',
      stop: false,
      editing: false,
      datetime: null,
      isFixedBottom: false,
      selectedItem: null,
      params: {
        status: 1,
        pageNo: 1
      },
      now: new Date,
      // allLoaded: true,
      // scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      // wrapperHeight: 0,
    }
  },
  created(){
  	this.loadData()
  },
  methods: {
    refresh() {
      this.params.pageNo = 1;
      this.loadData(false)
//    this.getPublishList(false);
      
    },
    changeTime(item) {
      item.editing = true;
      this.selectedItem = item;
      // this.datetime = util.formateStrToDate(this.selectedItem.startDate)
      this.$refs.datetime.open();
    },
    confirmDatetime(data) {
      this.selectedItem.editing = false;
      api.changeTime({
        endDate: util.formateDateToStr(data)
      }, this.selectedItem.id).then((res) => {
        if (res.resultCode === 'SUCCESS') {
          MessageBox.alert('修改成功')
          this.refresh();
        }
      }).catch((err) => {
        MessageBox.alert(err.message)
      })
    },
//  getPublishList(multi) {
//    this.loading = true;
//    api.getPublishList(this.params).then((data) => {
//      if (data.resultCode === 'SUCCESS') {
//        let res = data.data || {};
//        res.qnaireList.forEach((item) => {
//          item.editing = false
//        });
//        if (multi) {
//          this.datalist = this.datalist.concat(res.qnaireList);
//     
//        } else {
//          this.datalist = res.qnaireList
//        }
//        this.loading = false;
//        
//        // this.$nextTick(() => {
//        //   this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
//        // })
//      }
//    }).catch((err) => {
//      MessageBox.alert(err.message)
//    })
//    
//  },
//  loadMore() {
//    this.params.pageNo++;
//    this.getPublishList(true);
//    // this.$refs.loadmore.onBottomLoaded();
//  },
    loadData(multi){
    	api.getPublishList(this.params).then((data) => {
        if (data.resultCode === 'SUCCESS') {
          let res = data.data || {};
//        res.qnaireList.forEach((item) => {
//          item.editing = false
//        });
//        if (multi==false) {
          	this.datalist = res.qnaireList
//        } else {
//          this.datalist = this.datalist.concat(res.qnaireList);
//        }
//      
//        this.loading = false;
        }
      }).catch((err) => {
        MessageBox.alert(err.message)
      })
    }
  },
  components: {
    gHeader,
    empty,
    MessageBox,
    paperOp,
    scroll
  },
  mounted() {
    this.params.status = parseInt(this.$route.params.type);
    if (this.params.status === 2) {
      this.title = '已回收';
    }
//  this.getPublishList(true)
    this.loadData()
  }
}
</script>

<style lang="css">
.publish {
    background-color: #dddddd;
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
}
.publish-list {
	height: 100%;
  overflow: hidden;
}
.publish-list-item{
	padding-top: 2.5rem;
}
.item {
  margin-top: 0.5rem;
  background: white;
  font-size: 0.75rem;
  text-decoration: none;
  display: block;
}

.item-head {
  margin-top: 0.5rem;
  height: 1.8rem;
  padding: 0.5rem 1rem;
  color: #999
}

.item-head img {
  width: 1rem;
  height: 1rem;
  margin-bottom: 6px;
}
.info {
  display: inline-block;
  margin-left: 0.5rem;
}
.info p {
  line-height: 0.85rem;
}
.item-title {
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 0.5rem;
}
.item-detail {
  width: 72%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}
.item-detail ul{
  list-style: none;
}
.item-detail ul li {
  line-height: 1.2rem;
  color: #999;
}
.item-padding {
  padding: 0 0 1.2rem;
}
</style>
