# survey-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

使用better-scroll实现移动端滑动效果
看之前需要了解better-scroll文档:https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll 是什么

1.在vue里面使用better-scroll,首先要下载这个包，可以使用npm inatall better-scroll或者cnpm install better-scroll

2.个人喜欢封装好一个scroll文件，然后在需要的地方使用。网上有很多封装好的，这里就不贴出来了。

3.在.vue下使用时，首先先import一下导入scroll文件,然后记得注册，在html中使用时，记得它只对它的第一个子元素有效，因此存在多个同级标签时，记得用一个div包裹起来。

4.最后一点很多人会忽视的css布局，写个例子：
<template>
  <div class="container" ref="container">
    <scroll ref="scroll" class="container-content" :data="datalist">
        <div>
          <h1>test</h1>
          <ul>
             <li @click="selectItem(item)" v-for="item of datalist" class="item">
          		<h2 v-if="type == 3" v-html="item.endDate"></h2>
          		<p class="desc" v-html="item.answerTime"></p>
          	</li>
          </ul>
        </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import api from 'api/url'
import scroll from 'components/base/scroll/scroll'
	
export default {
  data(){
    return {
      title: '',
      datalist: [],
      ......
    }
  },
  methods: {
    ......
  },
  components: {
    scroll
  },
  mounted() {
    ....
}
</script>


<style>
	.container{
    position: fixed;
    /*width: 100%;*/
    top: 0px;
    bottom: 0px;
   }
	.container-content{
  	height: 100%;
  	overflow: hidden;
  	}
	.item{
	  ......
	}
</style>

.container:要设置固定定位position:fixed，这样才能设置它的宽高，可以设置top:0px;bottom:0px;

.container-content:就是scroll标签，当scroll标签的高度小于它子元素的高度时，才能实现下滑条，
所以在这里依赖于.container的宽高,可以设置scroll标签的高为height:100%;overflow:hidden;
具体可以看上面例子。
