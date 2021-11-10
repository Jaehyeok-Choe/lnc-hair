<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Login</v-card-title>
      </v-img>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            login
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> reset </v-btn>
          <br /><br />

          <router-link to="/resetPassword">Forgot your password?</router-link>
        </v-form>
      </v-card-text>
    </v-card>
    <center>
      <router-link to="/register">Create an account</router-link>
    </center>
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
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
