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
    masterAccount2: "",
    // PC의 표준시간대 설정 관계 없이 한국 시간기준의 날짜를 담는 변수
    koreaDate: "",
    // 지정된 예약날짜의 요일 담는 변수
    bookingDay: "",
  },
  getters: {
    email: (state) => state.email,
    masterAccount: (state) => state.masterAccount,
    masterAccount2: (state) => state.masterAccount2,
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
      state.masterAccount2 = "lya@gmail.com";
    },
    // PC의 표준시간대 설정 관계 없이 한국 시간기준의 날짜를 세팅
    setKoreaDate(state, payload) {
      state.koreaDate = payload;
    },
    // 지정된 예약날짜의 요일을 세팅
    setBookingDay(state, payload) {
      state.bookingDay = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      await firebase.auth().onAuthStateChanged((user) => {
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
    // PC의 표준시간대 설정 관계 없이 한국 시간기준의 날짜를 세팅
    getKoreaDate({ commit }) {
      // 1. 현재 시간(Locale)
      const curr = new Date();

      // 2. UTC 시간 계산
      const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

      // 3. UTC to KST (UTC + 9시간)
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const kr_curr = new Date(utc + KR_TIME_DIFF);
      commit("setKoreaDate", kr_curr);
    },
    // 지정된 예약날짜의 요일을 세팅
    getBookingDay({ commit }, date) {
      const d = new Date(date);
      let day = d.getDay();
      if (day === 0) {
        day = "일요일";
      } else if (day === 1) {
        day = "월요일";
      } else if (day === 2) {
        day = "화요일";
      } else if (day === 3) {
        day = "수요일";
      } else if (day === 4) {
        day = "목요일";
      } else if (day === 5) {
        day = "금요일";
      } else if (day === 6) {
        day = "토요일";
      }
      commit("setBookingDay", day);
    },
  },
  modules: {},
  plugins: [createPersistedState({})],
});
