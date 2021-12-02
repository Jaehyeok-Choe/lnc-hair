<template>
  <!-- 관리자 권한일때 -->
  <div
    v-if="
      adminCheck === this.$store.state.masterAccount ||
      adminCheck === this.$store.state.masterAccount2
    "
  >
    <BookingCheckAdmin></BookingCheckAdmin>
  </div>
  <!-- 일반유저 권한일때 -->
  <div v-else>
    <v-card-title class="justify-center"> 📍 MY예약내역</v-card-title>
    <v-card max-width="400" class="mx-auto" v-if="showBookingHistory">
      <v-container v-for="i in count" :key="i">
        <v-row dense>
          <v-col cols="12">
            <v-card :color="buttonColor[i - 1]" dark>
              <v-card-title class="text-h5"
                >{{ bookingDate[i - 1] }} / {{ dayArr[i - 1] }}
                <v-spacer></v-spacer>
                <div v-if="buttonColor[i - 1] === 'success'">
                  <v-btn
                    @click="
                      cancelBooking(bookingDate[i - 1], bookingTime[i - 1])
                    "
                    >취소</v-btn
                  >
                </div></v-card-title
              >

              <v-card-subtitle
                ><b>
                  <font :color="timeColor[i - 1]">
                    방문시간: {{ bookingTime[i - 1] }}:00</font
                  ></b
                ></v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div v-if="showNoDataMsg">
      <div style="font-weight: bold; font-size: 2em">
        <center>예약내역이 없습니다</center>
        <center>
          <v-btn :to="{ name: 'Booking' }" color="yellow"
            ><b>예약하러가기</b></v-btn
          >
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
import BookingCheckAdmin from "../about/bookingAdmin/BookingCheckAdmin";
export default {
  components: { BookingCheckAdmin },
  data() {
    return {
      bookingDate: [],
      bookingTime: [],
      name: [],
      buttonColor: [],
      count: 0,
      showBookingHistory: false,
      adminCheck: "",
      showNoDataMsg: false,
      day: "",
      dayArr: [],
      timeColor: [],
    };
  },
  created() {
    this.showNoDataMsg = false;

    // 관리자권한 이메일 가져오는 코드
    this.$store.dispatch("getMasterAccount");
    // 유저가 예약한 내역 가져오기 위한 코드
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("booking")
      .where("uid", "==", user.uid)
      .orderBy("bookingDate", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.bookingDate.push(doc.data().bookingDate);
          this.bookingTime.push(doc.data().bookingTime);
          // 예약날짜의 요일을 보여주기 위해 요일을 얻는 코드
          this.$store.dispatch("getBookingDay", doc.data().bookingDate);
          this.dayArr.push(this.$store.state.bookingDay);
          // 아래는 예약내역중 오늘날짜 이전의 값을 담은 카드들은 색깔을 회색으로 바꾸기 위한 코드 작성
          const temp = doc.data().bookingDate;
          const splitedDate = temp.split("-");
          const bookingDate = splitedDate[0] + splitedDate[1] + splitedDate[2];
          if (bookingDate >= this.getCurrentDate()) {
            this.buttonColor.push("success");
            this.timeColor.push("yellow");
          } else {
            this.buttonColor.push("grey");
            this.timeColor.push("grey");
          }

          this.count++;
        });
        this.showBookingHistory = true;
        if (!this.bookingDate.length) {
          this.showNoDataMsg = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // 현재 로그인된 유저의 이메일을 관리자 권한 제어를 위해 adminCheck 변수에 담는다.
    // 관리자일때 BookingCheckAdmin.vue 페이지로, 일반유저일때는 해당페이지를 보여주기 위함.
    this.adminCheck = user.email;
  },
  methods: {
    getCurrentDate() {
      const current = new Date();
      const temp = current.toISOString().split("T")[0];
      const splitedDate = temp.split("-");
      const date = splitedDate[0] + splitedDate[1] + splitedDate[2];
      return date;
    },
    cancelBooking(date, time) {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      db.collection("booking")
        .where("uid", "==", user.uid)
        .where("bookingDate", "==", date)
        .where("bookingTime", "==", time)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            Swal.fire({
              title: "예약취소",
              text: "예약을 정말 취소하시겠습니까?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "이 예약 취소하기",
              cancelButtonText: "취소하지 않기",
            }).then((result) => {
              if (result.isConfirmed) {
                doc.ref.delete();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "예약취소 완료",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
          });
        });
    },
  },
};
</script>

<style></style>
