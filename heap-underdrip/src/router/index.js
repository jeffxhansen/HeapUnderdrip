import Vue from 'vue'
import VueRouter from 'vue-router'
import Topics from '../views/Topics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Topics',
    component: Topics
  },
  {
    path: '/ask',
    name: 'Ask',

    component: () => import('../views/Ask.vue')
  },
  {
    path: '/questions',
    name: 'Questions',

    component: () => import('../views/Questions.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
