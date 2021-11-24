<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-card-text>
        <p class="text-center">
          <strong>예약리스트</strong>
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
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <p>
          <strong
            >{{ picker }} <br />
            예약리스트</strong
          >
        </p>
        <BookingButtonsAdmin :selectedDate="picker"></BookingButtonsAdmin>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BookingButtonsAdmin from "./BookingButtonsAdmin.vue";
export default {
  components: { BookingButtonsAdmin },
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
