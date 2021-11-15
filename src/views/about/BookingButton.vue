<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="mb-1">
      <v-btn class="mx-auto" color="success" :disabled="disableButton10"
        >{{ hourTen }}:00</v-btn
      >
      <v-btn class="mx-auto" color="success" :disabled="disableButton11"
        >{{ hourEleven }}:00</v-btn
      >
      <v-btn class="mx-auto" color="success" :disabled="disableButton12"
        >{{ hourTwelve }}:00</v-btn
      >
      <v-btn class="mx-auto" color="success" :disabled="disableButton13"
        >{{ hourThirteen }}:00</v-btn
      >
    </v-row>
    <v-row align="center" justify="center" class="mb-1">
      <v-btn class="mx-auto" color="success" :disabled="disableButton14"
        >{{ hourFourteen }}:00</v-btn
      >
      <v-btn class="mx-auto" color="success" :disabled="disableButton15"
        >{{ hourFifteen }}:00</v-btn
      >
      <v-btn class="mx-auto" color="success" :disabled="disableButton16"
        >{{ hourSixteen }}:00</v-btn
      >
      <v-btn class="mx-auto" color="success" :disabled="disableButton17"
        >{{ hourSeventeen }}:00</v-btn
      >
    </v-row>
    <v-row justify="center">
      <v-btn class="mr-1" color="success" :disabled="disableButton18"
        >{{ hourEighteen }}:00</v-btn
      >
      <v-btn color="success" :disabled="disableButton19"
        >{{ hourNineteen }}:00</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["selectedDate"],
  data() {
    return {
      hourTen: 10,
      hourEleven: 11,
      hourTwelve: 12,
      hourThirteen: 13,
      hourFourteen: 14,
      hourFifteen: 15,
      hourSixteen: 16,
      hourSeventeen: 17,
      hourEighteen: 18,
      hourNineteen: 19,
      disableButton10: false,
      disableButton11: false,
      disableButton12: false,
      disableButton13: false,
      disableButton14: false,
      disableButton15: false,
      disableButton16: false,
      disableButton17: false,
      disableButton18: false,
      disableButton19: false,
    };
  },
  methods: {},
  watch: {},
};
</script>

<style></style>
