import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: () => import("@/views/Home.vue"),
  },
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
    path: "/welcome",
    name: "Welcome",

    component: () =>
      import(/* webpackChunkName: "welcome" */ "../views/auth/Welcome.vue"),
  },
  {
    path: "/booking",
    name: "Booking",

    component: () =>
      import(/* webpackChunkName: "booking" */ "../views/about/Booking.vue"),
  },
  //booking2는 옵션이다. booking 과 booking중 원하는 스타일로 진행
  {
    path: "/booking2",
    name: "Booking2",

    component: () =>
      import(/* webpackChunkName: "booking2" */ "../views/about/Booking2.vue"),
  },
  {
    path: "/bookingCheck",
    name: "BookingCheck",

    component: () =>
      import(
        /* webpackChunkName: "bookingCheck" */ "../views/about/BookingCheck.vue"
      ),
  },
  {
    path: "/bookingCheckAdmin",
    name: "BookingCheckAdmin",

    component: () =>
      import(
        /* webpackChunkName: "bookingCheckAdmin" */ "../views/about/bookingAdmin/BookingCheckAdmin.vue"
      ),
  },
  {
    path: "/map",
    name: "Map",

    component: () =>
      import(/* webpackChunkName: "map" */ "../views/about/Map.vue"),
  },
  {
    path: "/contactUs",
    name: "ContactUs",

    component: () =>
      import(
        /* webpackChunkName: "contactUs" */ "../views/about/ContactUs.vue"
      ),
  },
  {
    path: "/styleBook",
    name: "StyleBook",

    component: () =>
      import(
        /* webpackChunkName: "styleBook" */ "../views/about/StyleBook.vue"
      ),
  },
  {
    path: "/master",
    name: "Master",

    component: () =>
      import(/* webpackChunkName: "master" */ "../views/master/Master.vue"),
  },
  {
    path: "/userProfile",
    name: "UserProfile",

    component: () =>
      import(
        /* webpackChunkName: "userProfile" */ "../views/master/UserProfile.vue"
      ),
  },
  {
    path: "/bookingList",
    name: "BookingList",

    component: () =>
      import(
        /* webpackChunkName: "bookingList" */ "../views/master/BookingList.vue"
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
  const userEmail = store.getters.email;
  const masterEmail = store.getters.masterAccount;
  const masterEmail2 = store.getters.masterAccount2;

  if (
    (isAuthenticated && to.name === "Login") ||
    (isAuthenticated && to.name === "Register") ||
    (isAuthenticated && to.name === "ResetPassword") ||
    (isAuthenticated &&
      to.name === "Master" &&
      userEmail != masterEmail &&
      userEmail != masterEmail2)
  ) {
    next("/");
  } else if (
    (!isAuthenticated && to.name === "Booking") ||
    (!isAuthenticated && to.name === "BookingCheck") ||
    (!isAuthenticated && to.name === "Master")
    // (!isAuthenticated && to.name === "Welcome")
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
