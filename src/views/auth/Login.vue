<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400">
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
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <br />
          <center>
            <v-btn
              :disabled="!valid"
              color="success"
              class="ma-2"
              @click="validate"
              large
            >
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;로그인
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
            </v-btn>
            <v-btn class="ma-2" color="info" large @click="googleLogin">
              <v-icon>mdi-google</v-icon> &nbsp;구글계정으로 로그인
            </v-btn>
            <br />Or<br />
            <v-btn color="black" class="ma-2 white--text" large>
              <router-link
                to="/register"
                style="text-decoration: none; color: inherit"
              >
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;회원가입 &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp;</router-link
              ></v-btn
            >
          </center>
          <br /><br />

          <router-link to="/resetPassword">비밀번호를 잊으셨나요?</router-link>
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
    // email val
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    // password val
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "Password is required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
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
            title: "Login Failed",
            text: "Password is invalid or the user does not have a password.",
            footer: "",
          });
        });
      this.$store.dispatch("getCurrentUser");
    },
    // reset() {
    //   this.$refs.form.reset();
    // },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
      this.$store.dispatch("getCurrentUser");
    },
  },
};
</script>

<style></style>
