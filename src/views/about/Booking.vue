<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-card-text>
        <p class="text-center">
          <strong>예약날짜선택</strong>
        </p>
        <v-row justify="space-around">
          <v-date-picker
            v-model="picker"
            color="green lighten-1"
            locale="ko-KR"
            full-width
          ></v-date-picker>
        </v-row>
      </v-card-text>
      <p class="text-center">
        <v-chip color="success" outlined>
          <v-icon left> mdi-server-plus </v-icon>
          예약날짜: {{ picker }}
        </v-chip>
      </p>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <p><strong>예약시간선택</strong></p>
        <BookingButtons
          :selectedDate="picker"
          :buttonColor="buttonColor"
        ></BookingButtons>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <p><strong>예약내역확인</strong></p>
        <v-btn color="success" :to="{ name: 'BookingCheck' }" block
          >예약보기</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BookingButtons from "./BookingButtons.vue";
export default {
  components: { BookingButtons },
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      buttonColor: "success",
    };
  },
  watch: {},

  methods: {},
};
</script>

<style></style>
