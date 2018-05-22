// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from '@/router';
import store from '@/store';
// import { CHECK_AUTH } from '@/store/modules/posts/type';

import ApiService from '@/api';


import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

Vue.config.productionTip = true;
Vue.config.debug = true;

ApiService.init();

// Ensure we checked auth before each page load.
// router.beforeEach(
//   (to, from, next) => {
//     return Promise
//       .all([store.dispatch(CHECK_AUTH)])
//       .then(next)
//   }
// )


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
