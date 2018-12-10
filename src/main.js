/* globals IS_DEV */
import Vue from 'vue';

//-- VUE CONFIGURATION ---------------------------------------------------------------

Vue.config.productionTip = IS_DEV;
Vue.config.debug = IS_DEV;
Vue.config.devtools = IS_DEV;

//-- API CONFIGURATION ---------------------------------------------------------------

import apiService from '@/api';
Vue.http = Vue.prototype.$http = apiService;
apiService.init();


//-- EXTERNAL LIBRARIES --------------------------------------------------------------

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);







//-- VUE INSTANCE INITIALIZATION ------------it must be at the end--------------------

import App from './App';
import router from '@/router';
import store from '@/store';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
