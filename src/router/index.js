import Vue from 'vue'
import Router from 'vue-router'

const Login = () =>
  import ('components/login/login.vue')
const Category = () =>
  import ('components/category/category.vue')
const Publish = () =>
  import ('components/publish/publish.vue')
const Answer = () =>
  import ('components/answer/answer.vue')
const Summary = () =>
  import ('components/summary/summary.vue')
const AnswerDetail = () =>
  import ('components/answerDetail/answerDetail.vue')

Vue.use(Router)

// function loginCheck(to, from, next) {
//   if(localStorage.getItem('userId')) {
//     next('/category')
//   } else {
//     next()
//   }
// }

function requireLogin(to, from, next) {
  if (!localStorage.getItem('userId')) {
    next({
      path: '/login',
      // query: { redirect: to.fullPath }
    })
  } else if ((to.name === 'summary' || to.name === 'publish') && JSON.parse(localStorage.getItem('isStudent')).isStudent) {
    next({
      path: '/category',
    })
  } else {
    next()
  }
}

const router = new Router({
  // mode: 'history',
  base: '/mobile/', //上线必须配置
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      // beforeEnter: loginCheck
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      beforeEnter: requireLogin
    },
    {
      path: '/publish/:type',
      name: 'publish',
      component: Publish,
      beforeEnter: requireLogin
    },
    {
      path: '/answer/:type',
      name: 'answer',
      component: Answer,
      beforeEnter: requireLogin
    },
    {
      path: '/summary/:id/:type',
      name: 'summary',
      component: Summary,
      beforeEnter: requireLogin
    },
    {
      path: '/answer-detail/:id',
      name: 'answerDetail',
      component: AnswerDetail,
      beforeEnter: requireLogin
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'summary') {
      return {
        x: 0,
        y: 0
      }
    } else {
      return savedPosition
    }
  }
})

export default router
