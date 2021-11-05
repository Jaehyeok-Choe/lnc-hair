<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- 오른쪽 상단 버튼클릭시 나오는 메뉴 시작 -->
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="menu in authMenu"
            :key="menu"
            @click="() => {}"
            :to="{ name: `${menu}` }"
          >
            <v-list-item-title> {{ menu }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- 오른쪽 상단 버튼클릭시 나오는 메뉴 끝 -->

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
          <v-btn block v-else :to="{ name: '/' }"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- 왼쪽 상단 버튼클릭시 나오는 메뉴 끝-->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

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
    authMenu: ["Login", "Join"],
  }),
};
</script>
