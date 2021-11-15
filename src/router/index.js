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

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",

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
  {
    path: "/booking",
    name: "Booking",

    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ "../views/about/Booking.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 로그인 여부에 따라 접근할 수 있는 메뉴 제어
router.beforeEach((to, from, next) => {
  const isAuthenticated = firebase.auth().currentUser;

  if (
    (isAuthenticated && to.name === "Login") ||
    (isAuthenticated && to.name === "Register") ||
    (isAuthenticated && to.name === "ResetPassword")
  ) {
    next("/");
  } else if (!isAuthenticated && to.name === "About") {
    next("/login");
  } else {
    next();
  }
});

export default router;
