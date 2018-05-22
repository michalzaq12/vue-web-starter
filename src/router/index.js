import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
// import Com from '@/components/Com'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,

      //<---PROTECT VIEW---->
      // beforeEnter: guardRoute

      //<---ASYNC LOADING COMPONENT---->
      // component: function (resolve) {
      //   require(['@/components/dashboard/Dashboard.vue'], resolve)
      // },
    }
  ]
});


function guardRoute (to, from, next) {

  const isLoggedIn = true;

  if (!isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

//<---refresh token before each page load---->
// router.beforeEach(
//   (to, from, next) => {
//     return Promise
//       .all([store.dispatch(CHECK_AUTH)])
//       .then(next)
//   }
// )
