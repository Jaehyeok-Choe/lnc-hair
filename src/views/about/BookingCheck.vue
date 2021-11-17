<template>
  <div>
    <v-card-title> 📍 예약내역</v-card-title>
    <v-card max-width="400" class="mx-auto" v-if="showBookingHistory">
      <v-container v-for="i in count" :key="i">
        <v-row dense>
          <v-col cols="12">
            <v-card color="success" dark>
              <v-card-title class="text-h5">{{
                bookingDate[i - 1]
              }}</v-card-title>

              <v-card-subtitle
                >방문시간: {{ bookingTime[i - 1] }}:00</v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import Swal from "sweetalert2";
export default {
  created() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("booking")
      .where("uid", "==", user.uid)
      .orderBy("createdDate", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.bookingDate.push(doc.data().bookingDate);
          this.bookingTime.push(doc.data().bookingTime);
          this.name.push(doc.data().name);

          console.log(this.count++);
        });
        this.showBookingHistory = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      bookingDate: [],
      bookingTime: [],
      name: [],
      count: 0,
      showBookingHistory: false,
    };
  },
};
</script>

<style></style>
