import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue"),
    beforeEnter: (to, from, next) => {
      const test = store.getters;
      if (!store.getters["userData/getLoggedIn"]) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/verbs",
    name: "verbs",
    component: () =>
      import(/* webpackChunkName: "verbs" */ "../views/Verbs.vue"),
    beforeEnter: (to, from, next) => {
      const test = store.getters;
      if (!store.getters["userData/getLoggedIn"]) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/verblookup/:verb",
    name: "verblookup",
    component: () =>
      import(/* webpackChunkName: "verblookup" */ "../views/VerbLookup.vue"),
    beforeEnter: (to, from, next) => {
      const test = store.getters;
      if (!store.getters["userData/getLoggedIn"]) {
        next("/login");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
