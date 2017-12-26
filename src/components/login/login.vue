<template lang="html">
  <div class="login">
    <div class="login_title">
        <img src="./title.png" class="login_title_img">
    </div>
    <div class="login_content">
        <input class="login_name" type="text" placeholder="输入账号" v-model="form.username" @focus="inputFocus" @input="handleInput($event)" @blur="inputBlur">
        <input class="login_word" type="password" placeholder="输入密码" v-model="form.password" @focus="inputFocus" @blur="inputBlur">
        <p class="login_err">{{error}}</p>
        <button class="login_bt" @click="login">登录</button>
    </div>
    <div class="login_foot" :class="isFocus? 'static' : 'fixed' ">
        <img src="./logo.png" class="login_foot_img">
    </div>
  </div>
</template>

<script>
import api from 'api/url'

export default {
  data() {
    return {
      error: null,
      form: {
        username: '',
        password: ''
      },
      isFocus: false
    }
  },
  methods: {
    handleInput(e) {
      this.form.username = this.form.username.replace(/[^\w\.\/]/ig, '');
    },
    checkLogin() {
      if (this.form.username === '') {
        this.error = '请输入您的账号名';
        return false;
      } else if (this.form.password === '') {
        this.error = '请输入您的密码';
        return false;
      }
      return true;
    },
    login() {
      if (this.checkLogin()) {
        api.login(this.form).then((data) => {
          if (data.resultCode === 'SUCCESS') {
            let res = data.data || {};
            let user = res.user || {};
            let isStudent = user.roleList.map((item) => (item.type)).indexOf('STUDENT') !== -1;
            // let isStudent = false;
            localStorage.setItem('userId', user.id);
            localStorage.setItem('isStudent', JSON.stringify({'isStudent': isStudent}))
            this.$router.push({ name: 'category'})
          } else {
            this.error = data.message
          }
        }).catch((err) => {
          this.error = err.message
        })
      }
    },
    inputFocus() {
      this.isFocus = true;
    },
    inputBlur() {
      this.isFocus = false
    }
  },

}
</script>

<style lang="css">
.login {
  height: 100%;
  background: white;
  padding-top: 12%;
}
/*标题图*/
.login_title{
  margin-left: 5%;
}
.login_title_img{
  width: 55%;
}

/*内容区*/
.login_content{
  width: 90%;
  margin: 0 auto;
  height: 15rem;
}
.login_name,
.login_word{
  margin: 0 auto;
  width: 95%;
  height: 16%;
  border: 1px solid #e5e5e5;
  border-radius: 0.25rem;
  margin-top: 0.8rem;
  padding-left: 0.8rem;
  font-size: 16px;
  font-family: "Microsoft YaHei UI Light";
}

.login_name{
  margin-top: 1.6rem;
}

/*错误*/
.login_err{
  width: 100%;
  height: 10%;
  font-size: 14px;
  line-height: 200%;
  color: #ff4e4e;
  text-align: center;
  margin-top: 2%;
}

/*按钮*/
.login_bt{
  width: 100%;
  height: 16%;
  font-size: 18px;
  color: #ffffff;
  border-radius: 0.25rem;
  background: -webkit-linear-gradient(left, #00b4ff, #1da1f2);
}

/*页尾*/
.login_foot_img{
  width: 3.5rem;
}
.login_foot{
  width: 100%;
  text-align: center;
}
.fixed {
  position: fixed;
  bottom: 10px;
}
.static {
  position: static;
}
</style>
