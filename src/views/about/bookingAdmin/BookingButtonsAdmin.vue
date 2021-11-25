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
          {{ item.bookingTime }}시 {{ item.name }}
          <a :href="`tel:${item.phoneNumber}`">
            ({{
              item.phoneNumber.slice(0, 3) +
              "-" +
              item.phoneNumber.slice(3, 7) +
              "-" +
              item.phoneNumber.slice(7, 11)
            }})</a
          ></b
        >&nbsp;
        <v-icon
          @click="deleteBooking(item.bookingDate, item.bookingTime, item.name)"
          >mdi-delete</v-icon
        >
      </v-chip>
    </div>
    <div v-else>{{ showUnavailableMsg }}</div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
export default {
  props: ["selectedDate"],
  data() {
    return {
      bookingList: [],
      showChip: false,
      showUnavailableMsg: "예약 내역이 없습니다.",
    };
  },
  // 페이지가 첫 로드될때 선택된 날짜(현재날짜) 값을 처리
  created() {
    this.getSelectedDateBookingList(this.selectedDate);
  },
  // BookingCheckAdmin 페이지에서 선택된 날짜 값을 받아오고 처리
  watch: {
    selectedDate: function (paramSelectedDate) {
      this.getSelectedDateBookingList(paramSelectedDate);
    },
  },
  methods: {
    // 예약리스트 삭제
    deleteBooking(date, time, name) {
      Swal.fire({
        title: "예약삭제",
        html: `<b>${name}</b>님의 <font color='red'><br>${date.slice(
          0,
          4
        )}년 ${date.slice(5, 7)}월 ${date.slice(
          8,
          10
        )}일 ${time}시</font> <br>예약을 정말 삭제하시겠습니까?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
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
          Swal.fire("삭제완료", "예약이 삭제되었습니다.", "success");
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      });
    },
    // 달력에서 선택된 날짜에 존재하는 예약들 가져오는 메서드
    getSelectedDateBookingList(paramSelectedDate) {
      this.bookingList = [];
      const db = firebase.firestore();
      db.collection("booking")
        .where("bookingDate", "==", paramSelectedDate)
        .orderBy("bookingTime")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.bookingList.push(doc.data());
          });
          this.showChip = true;
          if (this.bookingList.length === 0) {
            this.showChip = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
a:link {
  color: #0db50d;
  text-decoration: none;
}
</style>
