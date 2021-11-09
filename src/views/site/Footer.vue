<template>
  <v-footer color="deep-purple accent-4" padless>
    <v-row justify="center" no-gutters>
      <v-col
        class="deep-purple accent-4 lighten-2 py-0.5 text-center white--text"
        cols="12"
      >
        Copyright © {{ new Date().getFullYear() }} tbeben.
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>
<style></style>
