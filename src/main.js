// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import {
//   DatetimePicker
// } from 'mint-ui'
//
// import 'mint-ui/lib/datetime-picker/style.css'
// Vue.component(DatetimePicker.name, DatetimePicker);

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
