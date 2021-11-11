<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/road.jpg"
      >
        <v-card-title>Reset your password</v-card-title>
      </v-img>
      <v-card-text>
        Enter your email address and we'll email <br />you instructions on how
        to reset your password
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >Send</v-btn
          >
          <br /><br />
          <router-link to="/login">Log in</router-link> with your credentials
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
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Email has been sent successfully",
            footer: `Password reset email has been sent to "${this.email}"`,
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(
            `Error code: ${errorCode} <br> Error message: ${errorMessage}`
          );
        });
    },
  },
};
</script>

<style></style>
