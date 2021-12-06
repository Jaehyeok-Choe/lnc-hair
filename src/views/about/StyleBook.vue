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

      <div v-for="(card, index) in cards" :key="index">
        <div v-if="card.src != ''">
          <v-row>
            <v-col class="d-flex child-flex">
              <v-card>
                <v-img
                  :src="card.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="100%"
                >
                  <v-card-title v-text="index + 1"></v-card-title> </v-img
              ></v-card>
            </v-col>
          </v-row>
        </div>
      </div>
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

    cards: [
      {
        name: [],
        src: [],
        created: [],
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
            //date
            let date = itemRef.name.slice(-19, -9);
            let temp = date.split("-");
            let splitedDate = temp[0] + temp[1] + temp[2];
            //time
            let time = itemRef.name.slice(-8);
            let temp2 = time.split(":");
            let splitedTime = temp2[0] + temp2[1] + temp2[2];
            //to show images order by desc
            let dateTime = Number(splitedDate + splitedTime);
            this.cards.push({
              name: itemRef.name,
              src: url,
              created: dateTime,
            });
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    setTimeout(() => {
      this.cards.shift();
      this.cards.sort((a, b) => {
        return b.created - a.created;
      });
    }, 1000);
  },
  methods: {
    showFileUpload() {
      this.uploadBox = !this.uploadBox;
    },
  },
};
</script>

<style></style>
