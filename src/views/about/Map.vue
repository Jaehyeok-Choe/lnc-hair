<template>
  <v-container>
    <v-card
      class="mx-auto my-2"
      max-width="400"
      height="100%"
      elevation="24"
      outlined
      shaped
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://picsum.photos/510/300?random"
      ></v-img>

      <v-card-title>💈 • MEN's Hair & M -up</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div
            class="grey--text ms-4"
            v-if="this.$store.state.isLogin === true"
          >
            안녕하세요 {{ this.$store.state.userDisplayName }} 고객님!
          </div>
          <div v-else>&nbsp; {{ theBestEver }}</div>
        </v-row>

        <div class="my-2 mt-8" style="font-size: 1.4em">
          🗺 &nbsp;&nbsp;<b>Location</b>
        </div>

        <b>
          도로명:
          <a
            href="https://map.naver.com/v5/entry/place/1016156226?c=14397255.8506298,4237181.4188009,15,0,0,0,dh"
          >
            울산광역시 남구 달삼로75번길 11 2층 </a
          ><br />
          지번:
          <a
            href="https://map.naver.com/v5/entry/place/1016156226?c=14397255.8506298,4237181.4188009,15,0,0,0,dh"
            >울산광역시 남구 삼산동 1476-12 2층
          </a> </b
        ><br /><br />

        <div class="my-2" style="font-size: 1.4em">📞 &nbsp;<b>Calling</b></div>

        <b
          >매장번호: <a href="tel:070-7537-2678"> 070-7537-2678</a> 로 전화걸기
          <br />휴대번호: <a href="tel:010-6609-4610"> 010-6609-4610</a> 로
          전화걸기</b
        ><br /><br />

        <div class="my-2" style="font-size: 1.4em">💡 &nbsp;<b>Kakao</b></div>

        <b>
          <a
            href="https://open.kakao.com/me/lnc_manshair
"
            >오픈카톡</a
          ></b
        ><br /><br />

        <div class="my-2" style="font-size: 1.4em">🌏 &nbsp;<b>Online</b></div>

        <b> lnc-hair.web.app 접속 > 로그인 > </b>&nbsp;<v-btn
          color="yellow"
          small
          :to="{ name: 'Booking' }"
          ><b>예약하기</b></v-btn
        ><br /><br />

        <v-divider class="mx-4"></v-divider>

        <v-card-title>PRICE LIST</v-card-title>

        <v-card-text>
          <v-btn @click="showPriceList" color="yellow" block
            ><b>가격표보기</b></v-btn
          >
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Home",
  data() {
    return {
      theBestEver: "The Best Ever",
    };
  },
  methods: {
    showPriceList() {
      Swal.fire({
        title: "PRICE LIST",
        html: `<style>  
.mytable { border-collapse:collapse; font-weight: bold; }  
.mytable th, .mytable td { border:1px solid black; }
</style>
<font size="2">
  <table class="mytable" style="width:100%" >
    <tr>
      <th style="background-color:grey"><font color="white">CUT</font></th>
      <th style="background-color:grey"><font color="white">PERM</font></th>
    
    </tr>
    <tr>
      <td><br>맨즈컷 25,000<br><br>쥬니어컷 25,000</td>
      <td><br>다운펌(부분) 20,000<br><br>다운펌(전체) 50,000<br><br>콜드펌 90,000<br><br>아이롱펌 130,000<br><br>매직 110,000<br><br>컷트시 1만원 할인<br>&nbsp;</td>
    </tr>
    <tr>
      <th style="background-color:grey"><font color="white">CLINIC</font></th>
      <th style="background-color:grey"><font color="white">COLOR & ECT.</font></th>
    
    </tr>
    <tr>
      <td><br>헤드스파 <br>55,000<br><br>스파컷 <br>65,000<br><br>엠플 크리닉 <br>30,000<br><br>풀케어 크리닉<br> 70,000<br>&nbsp;</td>
      <td>컬러 (컷 포함) <br>77,000<br><br>컬러 (컷 미포함) <br>55,000<br><br>샴푸<br>11,000<br><br>드라이<br>15,000</td>
  
    </tr>
  </table>
</font>`,
      });
    },
  },
};
</script>
<style scoped>
#call {
  color: white;
  text-decoration: none;
}
</style>
