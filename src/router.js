import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'empty',
      },
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'empty',
      },
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/Categories.vue'),
    },
    {
      path: '/detail/:id',
      name: 'DetailRecord',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/DetailRecord.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/History.vue'),
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/Planning.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: '/record',
      name: 'record',
      meta: {
        layout: 'main',
        auth: true,
      },
      component: () => import('@/views/Record.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiredAuth = to.matched.some(item => item.meta.auth);

  if (requiredAuth && !currentUser) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router;
