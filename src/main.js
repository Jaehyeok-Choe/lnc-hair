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
  apiKey: "AIzaSyAoVp7K77yr-D3319ryru0hSyJ1Wz0a0tI",
  authDomain: "vuefs-prod-5ecb9.firebaseapp.com",
  projectId: "vuefs-prod-5ecb9",
  storageBucket: "vuefs-prod-5ecb9.appspot.com",
  messagingSenderId: "439471976083",
  appId: "1:439471976083:web:0731b8ecd55c7786c42766",
};
firebase.initializeApp(firebaseConfig).firestore;

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (!app) {
      app = new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
      }).$mount("#app");
    }
  }
});
