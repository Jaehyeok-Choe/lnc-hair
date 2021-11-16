<template>
  <v-container fill-height fluid>
    <!-- 예약가능시간 버튼 첫번 째 줄에 버튼 4개 생성 -->
    <v-row align="center" justify="center" class="mb-1">
      <v-btn
        v-for="i in 4"
        :key="i"
        @click="confirmBooking(selectedDate, bookingHours[i - 1])"
        class="mx-auto"
        color="success"
        :disabled="disableButtons[i - 1]"
        >{{ bookingHours[i - 1] }}:00</v-btn
      >
    </v-row>
    <!-- 예약가능시간 버튼 두번 째 줄에 버튼 4개 생성 -->
    <v-row align="center" justify="center" class="mb-1">
      <v-btn
        v-for="j in 4"
        :key="j"
        @click="confirmBooking(selectedDate, bookingHours[j + 3])"
        class="mx-auto"
        color="success"
        :disabled="disableButtons[j + 3]"
        >{{ bookingHours[j + 3] }}:00</v-btn
      >
    </v-row>
    <!-- 예약가능시간 버튼 세번 째 줄에 버튼 4개 생성 -->
    <v-row justify="center">
      <v-btn
        v-for="k in 2"
        :key="k"
        @click="confirmBooking(selectedDate, bookingHours[k + 7])"
        class="mr-1"
        color="success"
        :disabled="disableButtons[k + 7]"
        >{{ bookingHours[k + 7] }}:00</v-btn
      >
    </v-row>
  </v-container>
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
      bookingHours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],

      disableButtons: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };
  },
  created() {
    const db = firebase.firestore();
    db.collection("booking")
      .where("bookingDate", "==", this.selectedDate)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //doc.data().bookingTime;
          console.log(doc);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    confirmBooking(val, hour) {
      Swal.fire({
        title: `${val} / ${hour}:00`,
        text: "위 날짜와 시간으로 예약을 진행하시겠습니까?",
        showDenyButton: true,
        confirmButtonText: "확인",
        denyButtonText: `취소`,
      }).then((result) => {
        if (result.isConfirmed) {
          // 예약정보 저장하는 메소드 호출
          this.saveBookingInfo(val, hour);
          Swal.fire("예약완료", "", "success");
        }
      });
    },
    async saveBookingInfo(val, hour) {
      const db = firebase.firestore();
      await db
        .collection("booking")
        .doc()
        .set({
          bookingDate: val,
          bookingTime: hour,
          name: this.$store.state.userDisplayName,
          phoneNumber: "01089117370",
          uid: this.$store.state.uid,
        })
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {},
};
</script>

<style></style>
