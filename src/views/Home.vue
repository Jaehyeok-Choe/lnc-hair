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
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-carousel
        cycle
        height="240"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-img height="240" :src="item.src"></v-img>
        </v-carousel-item>
      </v-carousel>

      <v-card-title>L.N.C</v-card-title>
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
            <div
              v-if="
                this.$store.state.email === this.$store.state.masterAccount ||
                this.$store.state.email === this.$store.state.masterAccount2
              "
            >
              안녕하세요 관리자님!
            </div>
            <div v-else>
              안녕하세요
              <font color="black" style="background-color: #ffe400">
                <b
                  >&nbsp; {{ this.$store.state.userDisplayName }}&nbsp;&nbsp;</b
                ></font
              >
              고객님!
            </div>
          </div>
          <div v-else>&nbsp; {{ theBestEver }}</div>
        </v-row>
        <div class="my-4 text-subtitle-1">💈 • MEN's Hair & M -up</div>
        <div>
          남성전문 1인 헤어&메이크업샵으로 <br />
          "맨즈 프리미엄 토탈살롱" 입니다 :) <br />
          스타일 요구사항을 편하게 말씀해주세요 😝😊<br />

          <v-btn
            class="my-1 mb-3 mt-2"
            color="yellow"
            large
            :to="{ name: 'Login' }"
            v-if="this.$store.state.isLogin === false"
            block
          >
            <b>예약하기</b>
          </v-btn>
          <v-btn
            class="my-1 mb-3 mt-2"
            color="yellow"
            large
            :to="{ name: 'Master' }"
            v-else-if="
              this.$store.state.email === this.$store.state.masterAccount ||
              this.$store.state.email === this.$store.state.masterAccount2
            "
            block
            ><b>M A S T E R</b></v-btn
          >
          <v-btn
            class="my-1 mb-3 mt-2"
            color="yellow"
            large
            block
            :to="{ name: 'Booking' }"
            v-else
            ><b>예약하기</b></v-btn
          >
          <v-btn
            class="mx-0 mb-2"
            color="success"
            :to="{ name: 'BookingCheck' }"
            large
            block
            v-if="this.$store.state.isLogin"
            ><b> 예약내역</b></v-btn
          >

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
      items: [
        {
          src: require("../assets/LNC-designer.png"),
        },
        {
          src: require("../assets/lnc-interior.jpeg"),
        },
        {
          src: require("../assets/lnc-interior3.jpeg"),
        },
        {
          src: require("../assets/lnc-interior4.jpeg"),
        },
        {
          src: require("../assets/lnc-interior2.jpeg"),
        },
        {
          src: require("../assets/lnc-interior5.jpeg"),
        },
        {
          src: require("../assets/lnc-interior6.jpeg"),
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("getMasterAccount");
  },
};
</script>
<style scoped>
#call {
  color: white;
  text-decoration: none;
}
</style>
