<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/road.jpg"
      >
        <v-card-title>비밀번호 재설정</v-card-title>
      </v-img>
      <v-card-text>
        가입하신 이메일 주소를 입력하면 비밀번호 재설정 방법에 대한 지침을 해당
        이메일로 보내드립니다.
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >요청</v-btn
          >
          <br /><br />
          <router-link to="/login">로그인 화면으로</router-link>
        </v-form>
      </v-card-text>
    </v-card>
    <center></center>
  </v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      valid: true,
      // email val
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      return this.sendPasswordResetEmail();
    },
    sendPasswordResetEmail() {
      const auth = getAuth();
      auth.languageCode = "ko";
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "이메일 전송완료",
            footer: `비밀번호 재설정 이메일이 다음 주소로 전송되었습니다: "${this.email}"`,
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(
            `Error code: ${errorCode} <br> Error message: ${errorMessage}`
          );
          Swal.fire({
            icon: "warning",
            text: "가입되지 않은 이메일입니다",
            showConfirmButton: true,
          });
        });
    },
  },
};
</script>

<style></style>
