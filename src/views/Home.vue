<template>
  <div>
    <h1>Hi{{ userDisplayName }}!</h1>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "Home",
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const user = firebase.auth().currentUser;
        this.userDisplayName = ", " + user.displayName;
      } else {
        this.userDisplayName = "";
      }
    });
  },
  data() {
    return {
      userDisplayName: "",
    };
  },
  components: {},
};
</script>
