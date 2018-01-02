<template>
  <div>
  <div class="header"></div>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
	  return {
	    transitionName: 'slide-left'
	  }
	},
	beforeRouteUpdate (to, from, next) {
	  let isBack = this.$router.isBack
	  if (isBack) {
	    this.transitionName = 'slide-right'
	  } else {
	    this.transitionName = 'slide-left'
	  }
	  this.$router.isBack = false
	  next()
	}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: none;
}

html {
  font-size: 20px;
  height: 100%;
}

body {
  height: 100%;
}

i {
  font-style: normal;
}



.child-view {
	  position: absolute;
	  width:100%;
	  transition: all .3s cubic-bezier(.55,0,.1,1);
}
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translateX(100%);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translateX(-100%);
}




/*.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}*/
/*.fade-enter, .fade-leave-to*/ /* .fade-leave-active in below version 2.1.8 */ 
/*{
  opacity: 0;
}*/

a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: #232323
}

@font-face {
  font-family: 'iconfont';
  src: url('../static/fonts/iconfont.eot');
  src: url('../static/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../static/fonts/iconfont.woff') format('woff'),
  url('../static/fonts/iconfont.ttf') format('truetype'),
  url('../static/fonts/iconfont.svg#iconfont') format('svg');
}

.iconf {
  display: inline-block;
  font-family: 'iconfont';
  /*'FontAwesome'*/
  font-size: 14px;
  width: 16px;
  text-align: right;
  /*vertical-align: middle;*/
  position: relative;
  color: #999;
}

.i-stop:before {
  content: '\e66a';
}

.i-delete:before {
  content: '\e614';
}

.i-modify:before {
  content: '\e615';
}

.i-play:before {
  content: '\e65d';
  color: #64aad5;
  font-size: 12px;
  vertical-align: middle;
}

.i-back:before {
  content: '\e600';
  color: white;
  margin-right: 0.1rem;
}

.i-exit {
  margin-right: 0.2rem;
}

.i-exit:before {
  content: '\e684';
  color: white;
}
</style>
