<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-card-title>
        <v-file-input
          v-model="files"
          color="deep-purple accent-4"
          counter
          label="File input"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="text-overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
        <v-spacer></v-spacer
        ><v-btn @click="uploadImg" color="black" dark>add</v-btn>
      </v-card-title>
    </v-card></v-container
  >
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Swal from "sweetalert2";

export default {
  data: () => ({
    files: [],
  }),
  methods: {
    uploadImg() {
      if (this.files[0]) {
        // 파일 이름 중복 막기 위한 코드(이미지 파일 이름뒤에 현재날짜 + 시분초 로 파일명 생성)
        const d = new Date();
        const date = d.toISOString().split("T")[0];
        const time = d.toTimeString().split(" ")[0];
        const dateAndTime = date + " " + time;
        // 파일 업로드 시작
        const storage = firebase.storage();
        var file = this.files[0];
        var storageRef = storage.ref();
        var saveRoot = storageRef.child(
          "image/" + (file.name + "_" + `${dateAndTime}`)
        );
        var uploadWork = saveRoot.put(file);
        console.log(uploadWork);
        uploadWork.on(
          "state_changed",
          // 변화시 동작하는 함수
          null,
          // 에러시 동작하는 함수
          (error) => {
            console.log(error);
          },
          // 성공시 동작하는 함수
          () => {
            uploadWork.snapshot.ref.getDownloadURL().then((url) => {
              console.log("업로드된 경로: ", url);
            });
          }
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Finished!",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          html: `<p style="font-size:70%;"><b>업로드할 파일을 선택해 주시기 바랍니다</b></p>`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>

<style></style>
