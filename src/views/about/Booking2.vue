<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-card-text>
        <p>
          <v-chip color="success" outlined>
            <v-icon left> mdi-server-plus </v-icon>
            예약날짜선택
          </v-chip>
        </p>
        <v-row>
          <v-col>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="원하시는 날짜를 선택해 주시기 바랍니다."
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
                color="success"
                locale="ko-KR"
              ></v-date-picker>
            </v-menu>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <p>
          <v-chip color="success" outlined>
            <v-icon left> mdi-server-plus </v-icon>
            예약시간선택
          </v-chip>
        </p>
        <BookingButtons
          :selectedDate="date"
          :buttonColor="buttonColor"
        ></BookingButtons>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <p>
          <v-chip color="success" outlined>
            <v-icon left> mdi-server-plus </v-icon>
            예약내역확인
          </v-chip>
        </p>
        <v-btn color="success" :to="{ name: 'BookingCheck' }" block
          >예약보기</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BookingButtons from "./BookingButtons.vue";
export default {
  components: { BookingButtons },
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    buttonColor: "success",
  }),
};
</script>
