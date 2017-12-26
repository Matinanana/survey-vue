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

今天项目组给了一个项目给我，并且使用better-scroll实现上下滑动的效果，对此总结一些细节

1.在vue里面使用better-scroll,首先要下载这个包，可以使用npm inatall better-scroll或者cnpm install better-scroll

2.个人喜欢封装好一个scroll文件，然后在需要的地方使用。网上有很多封装好的，这里就不贴出来了。

3.在.vue下使用时，首先先import一下导入scroll文件,然后记得注册，在html中使用时，记得它只对它的第一个子元素有效，因此存在多个同级标签时，记得用一个div包裹起来。

4.最后一点很多人会忽视的css布局，写个例子：




html布局





css样式
.container:要设置固定定位position:fixed，这样才能设置它的宽高，可以设置top:0px;bottom:0px;

.container-content:就是scroll标签，当scroll标签的高度小于它子元素的高度时，才能实现下滑条，所以在这里依赖于.container的宽高,可以设置scroll标签的高为height:100%;overflow:hidden;

具体可以看例子。
