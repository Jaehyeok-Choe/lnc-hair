<template>
  <div class="mt-7">
    <v-card :loading="loading" class="mx-auto my-7" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="require('../assets/LNC-designer.png')"></v-img>

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
            안녕하세요 {{ this.$store.state.userDisplayName }} 고객님!
          </div>
          <div v-else>&nbsp; {{ theBestEver }}</div>
        </v-row>

        <div class="my-4 text-subtitle-1">💈 • MEN's Hair & M -up</div>

        <div>
          남성전문 1인 헤어&메이크업샵으로 남자를 위한<br />
          모든것들이 남성분들에게 맞추어져있는<br />
          "맨즈 프리미엄 토탈살롱" 입니다 :) <br />남자들의 편안한 미용실문화를
          추구합니다 !!<br />
          자신있고 당당하게 원하시는 스타일, 컴플렉스 등의 <br />요구사항을
          말씀해주세요 🧡<br />
        </div>
      </v-card-text>
      <v-card-actions>
        <center>
          <v-btn
            class="mx-0"
            color="yellow"
            large
            :to="{ name: 'Login' }"
            v-if="this.$store.state.isLogin === false"
          >
            <b>예약하기</b>
          </v-btn>
        </center>
      </v-card-actions>
      <v-divider class="mx-4"></v-divider>

      <v-card-title>Opening Hours</v-card-title>

      <v-card-text>
        매일 &nbsp;
        <v-chip>10:00AM</v-chip>
        ~
        <v-chip>20:00PM</v-chip><br /><br />
        휴무 &nbsp; <v-chip>첫째, 둘째, 넷째주 화요일</v-chip> /
        <v-chip>둘째주 일요일</v-chip> &nbsp; <br /><br />
        <div class="red--text">
          ※ 셋째주 화요일은 출근합니다 / 둘째주 일요일만 휴무입니다
        </div>
      </v-card-text>
    </v-card>
  </div>
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
