<template>
  <v-container>
    <v-card
      class="mx-auto my-2"
      max-width="400"
      height="100%"
      elevation="24"
      outlined
      shaped
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://picsum.photos/510/300?random"
      ></v-img>

      <v-card-title>💈 • MEN's Hair & M -up</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div
            class="grey--text ms-4"
            v-if="this.$store.state.isLogin === true"
          >
            안녕하세요 {{ this.$store.state.userDisplayName }} 고객님!
          </div>
          <div v-else>&nbsp; {{ theBestEver }}</div>
        </v-row>
        <br /><br />
        <div>
          <div style="font-size: 2em; font-weight: bold">
            <center>회원가입이 완료되었습니다</center>
          </div>
          <br />
          <center>회원님의 로그인 아이디는 아래와 같습니다</center>
          <br />
          <div style="font-size: 2em; font-weight: bold">
            <center>{{ this.$store.state.email }}</center>
          </div>
          <br />
          <v-card-actions>
            <v-btn
              class="mx-0"
              color="yellow"
              large
              :to="{ name: 'Login' }"
              v-if="this.$store.state.isLogin === false"
              block
            >
              <b>예약하기</b>
            </v-btn>
            <v-btn
              class="mx-0"
              color="yellow"
              large
              :to="{ name: 'Master' }"
              v-else-if="
                this.$store.state.email === this.$store.state.masterAccount
              "
              block
              ><b>M A S T E R</b></v-btn
            >
            <v-btn
              class="mx-0"
              color="yellow"
              large
              :to="{ name: 'Booking' }"
              v-else
              block
              ><b>예약하기</b></v-btn
            >
          </v-card-actions>
          <v-chip class="mt-2 mb-1" color="pink" label text-color="white">
            <v-icon left small> mdi-phone </v-icon>
            <a id="call" href="tel:010-6609-4610">010-6009-4610</a>&nbsp;&nbsp;
            /&nbsp;&nbsp;
            <a id="call" href="tel:070-7537-2678">070-7537-2678</a> </v-chip
          ><br />
          <p class="mb-2" style="font-size: 13px">
            ☏ 전화번호를 클릭하시면 전화 앱으로 연결됩니다
          </p>
          <v-chip class="mb-1 mr-1" small color="black" label text-color="white"
            >도로명</v-chip
          >
          울산 남구 달삼로75번길 11 2층<br />
          <v-chip class="mr-5" small color="black" label text-color="white"
            >지번</v-chip
          >울산 남구 삼산동 1476-12 2층 44719
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-title>Opening Hours</v-card-title>
      <v-card-text>
        매일 &nbsp;
        <v-chip class="ma-2" color="success" outlined> 10:00AM </v-chip>
        ~
        <v-chip class="ma-2" color="success" outlined> 20:00PM</v-chip>
        <br />
        휴무 &nbsp;
        <v-chip class="ma-2" x-small color="red" outlined>
          둘째 주 일요일</v-chip
        >
        *
        <v-chip class="ma-2" x-small color="red" outlined>
          첫/ 둘/ 넷째 주 화요일</v-chip
        >
        <div class="red--text">
          <center>※ 둘째 주 일요일 휴무 / 셋째 주 화요일은 출근</center>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      theBestEver: "The Best Ever",
    };
  },
};
</script>
<style scoped>
#call {
  color: white;
  text-decoration: none;
}
</style>
