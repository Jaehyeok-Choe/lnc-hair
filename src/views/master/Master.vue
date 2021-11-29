<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-card-title>M A S T E R</v-card-title>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'BookingCheck' }"
          ><b>예약내역</b></v-btn
        >
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'Booking' }"
          ><b>예약하기</b></v-btn
        >
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block><b>방문자통계</b></v-btn>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'StyleBook' }"
          ><b>스타일북</b></v-btn
        >
      </v-card-text>
      <v-divider class="mx-4"></v-divider> </v-card
  ></v-container>
</template>

<script>
export default {};
</script>

<style></style>
