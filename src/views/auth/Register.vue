<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
      >
        <v-card-title>Create your Account</v-card-title>
      </v-img>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

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

          <v-text-field
            v-model="passwordConfirm"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm Password"
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
            Sign up
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> reset </v-btn>
          <br /><br />
          <router-link to="/login">Back</router-link>
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
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
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
      required: (value) => !!value || "Password is required",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    // password confirm val
    show2: false,
    passwordConfirm: "",
    passwordRules: [(v) => !!v || "Password confirm is required"],
  }),

  methods: {
    validate() {
      if (this.password != this.passwordConfirm) {
        alert("Password mush match");
        return false;
      }
      if (this.$refs.form.validate()) {
        return this.submit();
      }
    },
    async submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          // save user info in firestore
          const db = firebase.firestore();
          db.collection("users").doc(user.user.uid).set({
            name: this.name,
            email: this.email,
          });
          // 필드값 가져와서 뿌리는것부터 시작 2021.11.08
          const docRef = db.collection("users").doc(user.user.uid);
          docRef.get().then((doc) => {
            doc.data().name;
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Account created for `,
            showConfirmButton: false,
            timer: 3000,
          });
          console.log(user);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
