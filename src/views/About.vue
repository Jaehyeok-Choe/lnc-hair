<template>
  <div class="about">
    <h1>This is an about page for {{ userName }}!</h1>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  created() {
    const isUserName = firebase.auth().currentUser.displayName;
    if (isUserName) {
      this.userName = isUserName;
    } else {
      this.userName = "";
    }
  },
  data() {
    return {
      userName: "",
    };
  },
};
</script>
