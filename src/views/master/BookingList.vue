<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="500" elevation="24" outlined shaped>
      <v-card-title>
        예약정보
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="profiles"
        :search="search"
      ></v-data-table> </v-card
  ></v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  created() {
    const db = firebase.firestore();
    db.collection("booking")
      .orderBy("bookingDate", "desc")
      .orderBy("bookingTime")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.profiles.push({
            bookingDate: doc.data().bookingDate,
            bookingTime: doc.data().bookingTime + "시",
            name: doc.data().name,
            phoneNumber: doc.data().phoneNumber,
          });
        });
      });
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "이름",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "전화번호", sortable: false, value: "phoneNumber" },
        { text: "예약일자", value: "bookingDate" },
        { text: "예약시간", sortable: false, value: "bookingTime" },
      ],
      profiles: [],
    };
  },
};
</script>

<style></style>
