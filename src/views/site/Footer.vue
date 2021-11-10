<template>
  <v-footer color="black" padless>
    <v-row justify="center" no-gutters>
      <v-col
        class="black accent-4 lighten-2 py-0.5 text-center white--text"
        cols="12"
      >
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
    links: ["Home", "About Us", "Services", "Instagram", "Blog", "Contact Us"],
  }),
};
</script>
<style></style>
