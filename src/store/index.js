import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    userDisplayName: "",
  },
  mutations: {
    setUserLoginOn(state) {
      state.isLogin = true;
    },
    setUserLoginOff(state) {
      state.isLogin = false;
    },
    setUserDisplayName(state, payload) {
      state.userDisplayName = payload;
    },
    emptyUserDisplayName(state) {
      state.userDisplayName = "";
    },
  },
  actions: {
    async checkLoginStatus({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setUserLoginOn");
          const userInfo = firebase.auth().currentUser;
          commit("setUserDisplayName", userInfo.displayName);
        } else {
          commit("setUserLoginOff");
          commit("emptyUserDisplayName");
        }
      });
    },
  },
  modules: {},
});
