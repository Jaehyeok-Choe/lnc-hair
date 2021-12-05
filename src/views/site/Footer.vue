<template>
  <v-footer color="black" padless>
    <v-col class="white--text" cols="12">
      <p style="font-size: 7px">
        Copyright © {{ new Date().getFullYear() }} L.N.C All rights reserved.
      </p>
      <center>
        <v-btn color="black" :to="{ name: 'Home' }">
          <v-icon size="25px" color="white"> mdi-home </v-icon>
        </v-btn>
        <v-btn color="black" :to="{ name: 'Map' }">
          <v-icon size="25px" color="white">mdi-map </v-icon>
        </v-btn>
        <!-- <v-btn color="black" :to="{ name: 'ContactUs' }">
          <v-icon size="25px" color="white"> mdi-phone </v-icon>
        </v-btn> -->
        <v-btn color="black" :to="{ name: 'StyleBook' }">
          <v-icon size="25px" color="white"> mdi-image </v-icon>
        </v-btn>
        <v-btn color="black" href="https://www.instagram.com/_nikka.lnc/">
          <v-icon size="25px" color="white"> mdi-instagram </v-icon>
        </v-btn>
      </center>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data: () => ({}),
};
</script>
<style></style>
