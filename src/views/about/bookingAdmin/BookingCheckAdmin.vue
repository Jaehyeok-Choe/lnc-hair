<template>
  <v-card
    class="mx-auto"
    max-width="374"
    height="100%"
    elevation="24"
    outlined
    shaped
  >
    <v-card-text>
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
          예약 리스트</strong
        >
      </p>
      <BookingButtonsAdmin :selectedDate="picker"></BookingButtonsAdmin>
    </v-card-text>
  </v-card>
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
