import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    uid: "",
    userDisplayName: "",
    email: "",
    phoneNumber: "",
    // 관리자권한
    masterAccount: "",
  },
  getters: {
    email: (state) => state.email,
    masterAccount: (state) => state.masterAccount,
  },
  mutations: {
    setUserLoginOn(state) {
      state.isLogin = true;
    },
    setUserLoginOff(state) {
      state.isLogin = false;
    },
    setUserProfile(state, payload) {
      state.uid = payload.uid;
      state.userDisplayName = payload.displayName;
      state.email = payload.email;
    },
    emptyUserProfile(state) {
      state.uid = "";
      state.userDisplayName = "";
      state.email = "";
      state.phoneNumber = "";
    },
    setUserPhoneNumber(state, payload) {
      state.phoneNumber = payload.phoneNumber;
    },
    setMasterAccount(state) {
      state.masterAccount = "tbeben77@gmail.com";
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userInfo = firebase.auth().currentUser;
          commit("setUserProfile", userInfo);
          commit("setUserLoginOn");
        } else {
          commit("emptyUserProfile");
          commit("setUserLoginOff");
        }
      });
    },
    getUserPhoneNumber({ commit }) {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();

      db.collection("users")
        .where("email", "==", user.email)
        .get()
        .then((doc) => {
          doc.forEach((doc) => {
            console.log(doc);
            commit("setUserPhoneNumber", doc.data());
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMasterAccount({ commit }) {
      commit("setMasterAccount");
    },
  },
  modules: {},
  plugins: [createPersistedState({})],
});
