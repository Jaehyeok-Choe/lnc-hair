<template>
  <div class="mt-7">
    <v-jumbotron>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Welcome{{ userDisplayName }}!</h3>

            <span class="subheading"
              >Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis
              maluisset molestiae id, ad semper lobortis cum. At impetus
              detraxit incorrupte usu, repudiare assueverit ex eum, ne nam
              essent vocent admodum.</span
            >

            <v-divider class="my-3"></v-divider>

            <div class="title mb-3">Check out our newest features!</div>

            <v-btn
              class="mx-0"
              color="yellow"
              large
              :to="{ name: 'Login' }"
              v-if="isLogin === false"
            >
              LOGIN / JOIN
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "Home",
  created() {
    // get logged in user name and display
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const user = firebase.auth().currentUser;
        this.userDisplayName = ", " + user.displayName;
        this.isLogin = true;
      } else {
        this.userDisplayName = "";
        this.isLogin = false;
      }
    });
  },
  data() {
    return {
      userDisplayName: "",
      isLogin: false,
    };
  },
  components: {},
};
</script>
