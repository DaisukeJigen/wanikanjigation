import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { useUserDataStore } from '@/stores/userData';
// const userData = useUserDataStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    // {
    //   path: "/test/:type",
    //   name: "test",
    //   component: () => import("../views/TestView.vue"),
    //   beforeEnter: (to, from, next) => {
    //     if (!userData.loggedIn) {
    //       next("/login");
    //     } else {
    //       next();
    //     }
    //   },
    // },
    {
      path: "/verbs",
      name: "verbs",
      component: () =>
        import("../views/ItemsView.vue"),
      props: {
        type: "verbs",
      },
      // beforeEnter: (to, from, next) => {
      //   if (!userData.loggedIn) {
      //     next("/login");
      //   } else {
      //     next();
      //   }
      // },
    },
    // {
    //   path: "/verblookup/:verb",
    //   name: "verblookup",
    //   component: () =>
    //     import("../views/Verbs/VerbLookupView.vue"),
    //   beforeEnter: (to, from, next) => {
    //     if (!userData.loggedIn) {
    //       next("/login");
    //     } else {
    //       next();
    //     }
    //   },
    // },
    {
      path: "/naAdjectives",
      name: "naAdjectives",
      component: () =>
        import("../views/ItemsView.vue"),
      props: {
        type: "naAdjectives",
      },
      // beforeEnter: (to, from, next) => {
      //   if (!userData.loggedIn) {
      //     next("/login");
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: "/iAdjectives",
      name: "iAdjectives",
      component: () =>
        import("../views/ItemsView.vue"),
      props: {
        type: "iAdjectives",
      },
      // beforeEnter: (to, from, next) => {
      //   if (!userData.loggedIn) {
      //     next("/login");
      //   } else {
      //     next();
      //   }
      // },
    },
  ]
})

export default router
