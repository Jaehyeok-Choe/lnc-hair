<template>
  <v-container fill-height fluid v-if="showButtons">
    <!-- 예약가능시간 버튼 첫번 째 줄에 버튼 4개 생성 -->
    <v-row align="center" justify="center" class="mb-1">
      <v-btn
        v-for="i in 4"
        :key="i"
        class="mx-auto"
        @click="confirmBooking(selectedDate, bookingHours[i - 1])"
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
      showButtons: false,
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
    // 아래 코드는 페이지 로드될때 current date에 이미 예약된 시간 버튼(들) disable 시킨다
    const db = firebase.firestore();
    db.collection("booking")
      .where("bookingDate", "==", this.selectedDate)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.disableButtons[doc.data().bookingTime - 10] = true;
        });
        this.showButtons = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    confirmBooking(val, hour) {
      Swal.fire({
        title: "예약확인",
        // text: `예약날짜: ${val}  예약시간: ${hour}:00`,

        html:
          "방문날짜: <b>" +
          val +
          "</b><br>방문시간: <b>" +
          hour +
          ":00</b>" +
          "<br><br><p style='color:red; font-size:15px;'>확인 버튼을 누르시면 예약이 완료됩니다.</p>",
        showDenyButton: true,
        confirmButtonText: "확인",
        denyButtonText: `취소`,
      }).then((result) => {
        if (result.isConfirmed) {
          // 예약정보 저장하는 메소드 호출
          this.saveBookingInfo(val, hour);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "예약완료",
            showConfirmButton: false,
            timer: 1300,
          });

          setTimeout(() => {
            location.reload();
          }, 1300);
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
          createdDate: this.getCurrentDate(),
        })
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCurrentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}${
        current.getMonth() + 1
      }${current.getDate()}`;
      return date;
    },
  },
  watch: {
    // Booking.vue의 캘린더에서 날짜 변경이 감지되는 순간 아래 코드 실행
    // selectedDate은 넘겨받은 props(picker)이다
    selectedDate: function (paramSelectedDate) {
      const tempSelectedDate = paramSelectedDate.split("-");
      const splitedSelectedDate =
        tempSelectedDate[0] + tempSelectedDate[1] + tempSelectedDate[2];
      // 캘린더에서 오늘 날짜 이전의 날을 클릭할 시 예약시간선택버튼 안보이도록
      if (parseInt(splitedSelectedDate) < this.getCurrentDate()) {
        this.showButtons = false;
      } else {
        // 다른 날짜 선택될 때 이전 변경된 값 초기화
        this.showButtons = false;
        for (let i = 0; i < 10; i++) {
          this.disableButtons[i] = false;
        }
        // 아래 코드는 선택된 날짜에 이미 예약된 시간 버튼(들) disable 시킨다
        const db = firebase.firestore();
        db.collection("booking")
          .where("bookingDate", "==", paramSelectedDate)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.disableButtons[parseInt(doc.data().bookingTime - 10)] = true;
            });
            this.showButtons = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
