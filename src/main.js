import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDNhdzJwbD50uxFg2otF0NEcF5FMBxqQJk",
  authDomain: "lnc-hair.firebaseapp.com",
  projectId: "lnc-hair",
  storageBucket: "lnc-hair.appspot.com",
  messagingSenderId: "289917646549",
  appId: "1:289917646549:web:d90c870af3963ee6ca145c",
  measurementId: "G-46091H3QH9",
};
firebase.initializeApp(firebaseConfig).firestore;

let app;

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
