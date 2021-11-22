<template>
  <div>
    <div v-if="showChip">
      <v-chip
        class="ma-2"
        color="green"
        outlined
        v-for="(item, index) in bookingList"
        :key="index"
      >
        <v-icon left> mdi-account-circle-outline </v-icon>
        <b>
          {{ item.bookingTime }}시 {{ item.name }} ({{ item.phoneNumber }})</b
        >
        <v-icon @click="deleteBooking(item.bookingDate, item.bookingTime)"
          >mdi-delete</v-icon
        >
      </v-chip>
    </div>
    <div v-else>예약 내역이 없습니다.</div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import Swal from "sweetalert2";
export default {
  props: ["selectedDate"],
  data() {
    return {
      bookingList: [],
      showChip: false,
    };
  },
  // 페이지가 첫 로드될때 선택된 날짜(현재날짜) 값을 처리
  created() {
    this.getSelectedDate(this.selectedDate);
  },
  // BookingCheckAdmin 페이지에서 선택된 날짜 값을 받아오고 처리
  watch: {
    selectedDate: function (paramSelectedDate) {
      this.getSelectedDate(paramSelectedDate);
    },
  },
  methods: {
    // 예약리스트 삭제
    deleteBooking(date, time) {
      const db = firebase.firestore();
      db.collection("booking")
        .where("bookingDate", "==", date)
        .where("bookingTime", "==", time)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
    },
    // 달력에서 선택된 날짜에 존재하는 예약들 가져오는 메서드
    getSelectedDate(paramSelectedDate) {
      this.bookingList = [];
      const db = firebase.firestore();
      db.collection("booking")
        .where("bookingDate", "==", paramSelectedDate)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.bookingList.push(doc.data());
          });
          this.showChip = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
