<template>
  <v-card class="mx-auto mt-3" max-width="344" height="97%">
    <v-card-text>
      <p class="text-center">예약날짜선택</p>
      <v-row justify="space-around">
        <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
      </v-row>
    </v-card-text>
    <p class="text-center">
      <v-chip class="ma-2" color="success" outlined>
        <v-icon left> mdi-server-plus </v-icon>
        예약날짜: {{ picker }}
      </v-chip>
    </p>
    <v-divider class="mx-4"></v-divider>
    <v-card-text class="text-center">
      <p>예약시간선택</p>
      <BookingButtons :selectedDate="picker"></BookingButtons>
    </v-card-text>
  </v-card>
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
    };
  },
  watch: {
    // picker: function (paramSelectedDate) {
    //   this.test(paramSelectedDate);
    // },
  },

  methods: {
    // test(val) {
    //   alert(val);
    // },
  },
};
</script>

<style></style>
