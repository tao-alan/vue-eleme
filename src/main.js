import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import "./assets/less/index.less";
import {format, fromNow} from 'silly-datetime';
//挂载到vue上
Vue.prototype.$http = axios

Vue.config.productionTip = false

//全局过滤器
Vue.filter('formatDate', function (time) {
    return format(new Date(time), 'YYYY-MM-DD HH:mm');
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
