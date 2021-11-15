<template>
  <v-card class="mx-auto mt-3" max-width="344" height="97%">
    <v-card-text>
      <p class="text-h5 text--primary text-center mb-7">예약날짜선택</p>
      <v-row justify="space-around">
        <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
      </v-row>
    </v-card-text>
    <v-card-text class="text-center">
      <BookingButton :selectedDate="picker"></BookingButton>
    </v-card-text>
  </v-card>
  <!-- <v-row justify="space-around">
    <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
  </v-row> -->
</template>

<script>
import BookingButton from "./BookingButton.vue";
export default {
  components: { BookingButton },
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
};
</script>

<style></style>
