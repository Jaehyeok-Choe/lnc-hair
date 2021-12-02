<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <div
        v-if="
          this.adminCheck === this.$store.state.masterAccount ||
          this.adminCheck === this.$store.state.masterAccount2
        "
      >
        <div class="pa-5">
          <v-btn @click="showFileUpload" class="mx-0" color="yellow" block
            ><b>Upload</b></v-btn
          >
        </div>
        <div v-if="uploadBox">
          <upload-image></upload-image>
        </div>
        <div v-else></div>
      </div>

      <div v-for="i in test" :key="i">
        <v-img :src="i"></v-img>
      </div>

      <!-- <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer> -->

      <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn> -->
      <!-- </v-card-actions>
          </v-card>
        </v-col>
      </v-row> -->
    </v-card>
  </v-container>
</template>

<script>
import UploadImage from "../about/upload/UploadImage.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import Swal from "sweetalert2";
export default {
  components: { UploadImage },
  data: () => ({
    adminCheck: "",
    uploadBox: false,
    test: [],
    cards: [
      {
        title: "a",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "b",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "c",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
      {
        title: "d",
        src: "https://picsum.photos/510/300?randomg",
        flex: 6,
      },
      {
        title: "e",
        src: "https://picsum.photos/510/300?random",
        flex: 6,
      },
    ],
  }),
  created() {
    this.$store.dispatch("getMasterAccount");
    const user = firebase.auth().currentUser;
    this.adminCheck = user.email;
    // 파이어베이스 스토리지에서 한 폴더에 대한 전체 이미지 가져오는 코드
    // Create a reference under which you want to list
    var storageRef = firebase.storage().ref("image");

    // Find all the prefixes and items.
    storageRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.

          itemRef.getDownloadURL().then((url) => {
            this.test.push(url);
          });
        });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  },
  methods: {
    showFileUpload() {
      this.uploadBox = !this.uploadBox;
    },
  },
};
</script>

<style></style>
