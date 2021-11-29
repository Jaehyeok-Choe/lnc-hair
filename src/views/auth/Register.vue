<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
      >
        <v-card-title>회원가입</v-card-title>
      </v-img>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="이름"
            required
          ></v-text-field>

          <v-text-field
            v-model="phoneNumber"
            :counter="11"
            :rules="phoneNumberRules"
            label="휴대전화"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일"
            required
            ref="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="비밀번호"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-text-field
            v-model="passwordConfirm"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="비밀번호 확인"
            hint="At least 8 characters"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            가입하기
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> 다시작성 </v-btn>
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

export default {
  data: () => ({
    valid: true,
    // name val
    name: "",
    nameRules: [
      (v) => !!v || "이름은 필수 입력 사항입니다",
      (v) => (v && v.length <= 10) || "이름은 10자 미만이어야 합니다",
    ],
    // phone number val
    phoneNumber: null,
    phoneNumberRules: [
      (v) => !!v || "전화번호는 필수 입력 사항입니다",
      (v) => (v && v.length == 11) || "전화번호는 11자리여야 합니다",
      (v) => !isNaN(v) || "숫자만 입력",
    ],
    // email val
    email: "",
    emailRules: [
      (v) => !!v || "이메일은 필수 입력 사항입니다",
      (v) => /.+@.+\..+/.test(v) || "이메일이 유효해야 합니다",
    ],
    // password val
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "비밀번호는 필수 입력 사항입니다",
      min: (v) => v.length >= 8 || "비밀번호는 최소 8자리여야 합니다",
    },
    // password confirm val
    show2: false,
    passwordConfirm: "",
    passwordRules: [(v) => !!v || "비밀번호 재확인은 필수 입력 사항입니다"],
  }),

  methods: {
    validate() {
      if (this.password != this.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다");
        return false;
      }
      if (this.$refs.form.validate()) {
        return this.submit();
      }
    },
    async submit() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userData) => {
          // set displayName when create account
          userData.user.updateProfile({ displayName: this.name });

          // timestamp for user create
          const current = new Date();
          const date =
            current.getFullYear() +
            "-" +
            (current.getMonth() + 1) +
            "-" +
            current.getDate();
          const time =
            current.getHours() +
            ":" +
            current.getMinutes() +
            ":" +
            current.getSeconds();
          const dateTime = date + " / " + time;
          // save user info in firestore
          const db = firebase.firestore();
          db.collection("users").doc(userData.user.uid).set({
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            dateCreated: dateTime,
          });

          Swal.fire({
            icon: "success",
            title: "회원가입 완료",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            // 회원가입후 홈으로 보내졌을때 유저정보세팅 위함
            // 위 updateProfile보다 아래 두 코드가 더 빨리 실행되므로 setTimeout 으로 이것을 제어.
            // 아래 두 코드를 setTimeout으로 제어하지 않으면 회원가입후 홈화면으로 넘어갔을때
            // displayName = null 의 결과가 나와 홈화면에서 유저이름이 나오지 않는다.
            // 이 부분은 좀 더 스터디가 필요하다.
            this.$store.dispatch("getCurrentUser");
            this.$router.push({ name: "Welcome" });
          }, 2200);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "이미 다른 계정에서 사용 중인 이메일 입니다.",
            showConfirmButton: true,
          });
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
