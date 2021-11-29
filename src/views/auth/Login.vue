<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>로그인</v-card-title>
      </v-img>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="비밀번호"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <br />

          <v-btn
            class="my-2"
            :disabled="!valid"
            color="success"
            block
            @click="validate"
          >
            <b> 로그인</b>
          </v-btn>
          <v-btn class="my-2" color="#ffe812" block @click="kakaoLogin">
            <Icon icon="vs:kakaotalk" />&nbsp;<b> 카카오계정으로 로그인</b>
          </v-btn>
          <v-btn class="my-1" color="#dd4b39" dark block @click="googleLogin">
            <v-icon>mdi-google</v-icon> &nbsp;<b> 구글계정으로 로그인</b>
          </v-btn>
          <center>or</center>
          <router-link
            to="/register"
            style="text-decoration: none; color: inherit"
          >
            <v-btn color="black" class="my-1 white--text" block>
              <b> 회원가입</b>
            </v-btn></router-link
          >

          <br /><br />

          <router-link to="/resetPassword">비밀번호를 잊으셨나요?</router-link>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
import { Icon } from "@iconify/vue2";
export default {
  components: {
    Icon,
  },
  data: () => ({
    valid: true,
    // email val
    email: "",
    emailRules: [
      (v) => !!v || "이메일은 필수 항목입니다",
      (v) => /.+@.+\..+/.test(v) || "이메일이 유효해야 합니다",
    ],
    // password val
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "비밀번호가 필요합니다.",
      min: (v) => v.length >= 8 || "비밀번호는 최소 8자 이상입니다",
    },
    kakaoId: "",
    kakaoEmail: "",
    kakaoNickname: "",
    isKakaoLogin: false,
    phoneNumber: "",
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        return this.submit();
      }
    },
    async submit() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Signed in
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: "암호가 잘못되었거나 사용자에게 암호가 없습니다",
            footer: "",
          });
        });
      this.$store.dispatch("getCurrentUser");
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    // 구글로그인
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          alert("구글 로그인이 취소되었습니다. 다시 시도해 주시기 바랍니다.");
        });
      this.$store.dispatch("getCurrentUser");
    },
    // 카카오로그인
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email, talk_message",
        success: function (authObj) {
          console.log(authObj);
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              const kakao_account = res.kakao_account;
              this.kakaoId = kakao_account.id;
              this.kakaoEmail = kakao_account.email;
              this.kakaoNickname = kakao_account.profile.nickname;
              const db = firebase.firestore();
              db.collection("users")
                .where("email", "==", this.kakaoEmail)
                .get()
                .then((doc) => {
                  if (doc.empty) {
                    console.log("신규가입");
                    Swal.fire({
                      html: "예약서비스 사용을 위한 휴대폰 번호를 입력해주세요",
                      input: "number",
                    }).then((data) => {
                      this.phoneNumber = data.value;
                      if (data.value.length > 10 && data.value.length < 12) {
                        firebase
                          .auth()
                          .createUserWithEmailAndPassword(
                            this.kakaoEmail,
                            data.value
                          )
                          .then((userData) => {
                            userData.user.updateProfile({
                              displayName: this.kakaoNickname,
                            });

                            db.collection("users").doc(userData.user.uid).set({
                              name: this.kakaoNickname,
                              phoneNumber: data.value,
                              email: this.kakaoEmail,
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: "warning",
                          title: "잘못된 입력입니다",
                          showConfirmButton: false,
                          timer: 2000,
                        });
                      }
                    });
                  } else {
                    console.log("회원임");
                  }
                });
            },
          });
        },
      });
    },
  },
};
</script>

<style></style>
