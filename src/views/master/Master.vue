<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-card-title>MASTER</v-card-title>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'BookingCheck' }"
          ><b>예약보기(달력)</b></v-btn
        >
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'BookingList' }"
          ><b>예약보기(일반)</b></v-btn
        >
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'Booking' }"
          ><b>예약하기(고객)</b></v-btn
        >
      </v-card-text>
      <!-- <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'StyleBook' }"
          ><b>스타일북</b></v-btn
        >
      </v-card-text> -->
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'Map' }"
          ><b>오시는길</b></v-btn
        >
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <v-btn color="yellow" block :to="{ name: 'UserProfile' }"
          ><b>회원보기</b></v-btn
        >
      </v-card-text>
    </v-card></v-container
  >
</template>

<script>
export default {};
</script>

<style></style>
