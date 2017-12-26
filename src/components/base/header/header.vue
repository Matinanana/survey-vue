<template lang="html">
  <div class="head">
    <div v-show="showBack" class="back" @click="goBack">
      <i class="iconf i-back"></i>返回
    </div>
    <span class="title" v-html="_title"></span>
    <div class="exit" @click="exit">
      <i class="iconf i-exit"></i>退出
    </div>
  </div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui'
import api from 'api/url'

export default {
  props: {
    title: {
      type: String,
      default: '问卷调查系统',
      require: true
    },
    showBack: {
      type: Boolean,
      default: true
    },
    url: {
      type: Object,
      default: null
    }
  },
  computed:{
    _title() {
      return this.title.length > 10 ? this.formateTitle(this.title) : this.title
    }
  },
  methods: {
    goBack() {
      if(this.url) {
        this.$router.push(this.url)
      } else {
        this.$router.back();
      }
    },
    formateTitle(title) {
      return title.substr(0, 10) + '...'
    },
    exit() {
      MessageBox.confirm('确定退出当前账户吗').then(() => {
        api.logout().then((data) => {
          if (data.resultCode === 'SUCCESS') {
            sessionStorage.clear();
            localStorage.clear();
            this.$router.push('/login')
          }
        })
      }).catch((err) => {
        // MessageBox.alert(err.message)
      })
    }
  },
  mounted() {
  },
  components: {
    MessageBox
  }
}
</script>

<style lang="css">
.head {
  font-size: 0.8rem;
  height: 2.5rem;
  background-color: #232323;
  color: white;
  text-align: center;
  width: 100%;
  z-index: 10;
  position: fixed;
  top: 0
}

.back {
  position: absolute;
  left: 1rem;
  line-height: 2.5rem;
}

.back img {
  margin-right: 0.3rem;
  width: 0.4rem;
  vertical-align: top;
  margin-top: 1rem;
}
.title {
  line-height: 2.5rem
}
.exit {
  position: absolute;
  right: 1rem;
  line-height: 2.5rem;
  display: inline-block;
}
</style>
