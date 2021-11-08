<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
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
    },
  },
};
</script>

<style></style>
