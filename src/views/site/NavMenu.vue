<template>
  <div>
    <!-- <v-app-bar app color="deep-purple accent-4" dense dark> -->
    <v-app-bar app color="black" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: inherit"
          >💈 L.N.C</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- 왼쪽 상단 버튼클릭시 나오는 메뉴 시작-->
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="black"
            dark
            v-if="isLogin === false"
            :to="{ name: 'Login' }"
          >
            Login / Join</v-btn
          >
          <v-btn block v-else @click="signOut"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- 왼쪽 상단 버튼클릭시 나오는 메뉴 끝-->
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  },
  data: () => ({
    drawer: false,
    isLogin: false,
    items: [
      {
        action: "mdi-home",
        items: [{ title: "Home", to: "/" }],
        title: "Home",
      },
      {
        action: "mdi-information",
        // active: true,
        items: [
          { title: "About", to: "/about" },
          { title: "Address", to: "/" },
        ],
        title: "About",
      },
    ],
    authMenu: ["Login", "Register"],
  }),
  methods: {
    async signOut() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.push({ name: "Login" });
        // location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
