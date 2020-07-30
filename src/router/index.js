import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/blog/:articleId',
    name: 'ShowBlog',
    component: () => import('../views/ShowBlog.vue')
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('../views/Management.vue'),
    meta: {
      needAuth: true
    },
    children: [
      {
        path: 'blog/new',
        name: 'NewBlog',
        component: () => import('../views/management/NewBlog.vue')
      },
      {
        path: 'user',
        name: 'UserInfo',
        component: () => import('../views/management/UserInfo.vue')
      },
      {
        path: 'blog/edit/:articleId',
        name: 'editBlog',
        component: () => import('../views/management/EditBlog.vue')
      }
    ]
  },
  {
    path: '/label',
    name: 'Label',
    component: () => import('../views/Label.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.blogToken ;
  if (to.meta.needAuth && !isLogin) {
    next("/");
  } else {
    next();
  }
});

export default router
