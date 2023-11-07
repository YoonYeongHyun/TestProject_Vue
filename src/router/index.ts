import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/PageAxios',
    name: 'PageAxios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageAxios.vue')
  },
  {
    path: '/PageComponents',
    name: 'PageComponents',
    component: () => import(/**/'../views/PageComponents.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/notFound"
  },
  {
    path: "/notFound",
    name: "notFound",
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router