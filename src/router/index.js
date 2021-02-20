import Vue from 'vue'
import VueRouter from 'vue-router'
import "@/translations"
import PostDetails from "@/components/PostDetails.vue"

Vue.use(VueRouter)

let vm = new Vue()

function load(component) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)
}

const routes = [
  {
    path: '/',
    name: vm.$gettext("Home"),
    component: load("Home"),
    icon: "mdi-home"
  },
  {
    path: '/blog',
    name: vm.$gettext('Blog'),
    component: load("Blog"),
    icon: "mdi-newspaper"
  },
  {
    path: '/blog/:Pid',
    name: 'details',
    component: PostDetails,
    meta: { transitionName: 'zoom' }
  },
  {
    path: '/settings',
    name: vm.$gettext('Settings'),
    component: load("Settings"),
    icon: "mdi-cog"
  },
  {
    path: '/about',
    name: vm.$gettext('About'),
    component: load("About"),
    icon: "mdi-lightbulb-on"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
