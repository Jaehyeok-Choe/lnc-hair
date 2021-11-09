<template>
  <v-app>
    <nav-menu></nav-menu>
    <v-main>
      <router-view />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavMenu from "./views/site/NavMenu.vue";
import Footer from "./views/site/Footer.vue";
export default {
  components: { NavMenu, Footer },
  name: "App",

  data: () => ({}),
};
</script>
