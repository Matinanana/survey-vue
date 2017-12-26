<template lang="html">
  <div class="home">
    <g-header :show-back="showBack"></g-header>
    <category></category>
    <footer>恒峰问卷调查系统</footer>
  </div>
</template>

<script>
import gHeader from 'components/base/header/header'
import category from 'components/category/category'
export default {
  data() {
    return {
      showBack: false
    }
  },
  components: {
    gHeader,
    category
  }
}
</script>

<style lang="css">
.home {
  height: 100%;
  background: #ddd;
}
footer{
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: #999999;
  position: absolute;
  bottom: 10px;
}
</style>
