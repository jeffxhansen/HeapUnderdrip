import Vue from 'vue'
import VueRouter from 'vue-router'
//import Topics from '../views/Topics.vue'

Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    name: 'Topics',
    component: Topics
  },*/
  {
    path: '/',
    name: 'newQuestions',

    component: () => import('../views/NewQuestions.vue')
  },
  {
    path: '/ask',
    name: 'Ask',

    component: () => import('../views/Ask.vue')
  },
  {
    path: '/newQuestions',
    name: 'NewQuestions',

    component: () => import('../views/NewQuestions.vue')
  },
  {
    path: '/singleQuestion',
    name: 'SingleQuestion',
    props: true,

    component: () => import('../views/SingleQuestion.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
