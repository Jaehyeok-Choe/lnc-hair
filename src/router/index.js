import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresGuest: true },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "join" */ "../views/auth/Register.vue"),
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ "../views/auth/ResetPassword.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => {
      record.meta.requiresAuth;
    })
  ) {
    if (!firebase.auth().currentUser) {
      next("/login");
    } else {
      next();
    }
  } else if (
    to.matched.some((record) => {
      record.meta.requiresGuest;
    })
  ) {
    if (firebase.auth().currentUser) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
  // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const requiresGuest = to.matched.some((record) => {
  //   record.meta.requiresGuest;
  // });
  // const isAuthenticated = firebase.auth().currentUser;
  // if (requiresAuth && !isAuthenticated) {
  //   next("/login");
  // } else if (requiresGuest && isAuthenticated) {
  //   next("/");
  // } else {
  //   next();
  // }
});

export default router;
