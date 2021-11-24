<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://picsum.photos/510/300?random"
      >
        <v-card-title>연락하기</v-card-title>
      </v-img>
      <br />
      <v-card-title class="ml-5">📞 &nbsp;<b>전화문의 & 예약</b></v-card-title>
      <v-card-text class="ml-14">
        매장번호:
        <a href="tel:070-7537-2678"> 070-7537-2678</a> 로 전화걸기
        <br /><br />휴대번호: <a href="tel:010-6609-4610"> 010-6609-4610</a> 로
        전화걸기</v-card-text
      >
      <v-card-title class="ml-5">💡 &nbsp;<b>카톡문의 & 예약</b></v-card-title>
      <v-card-text class="ml-14">
        <a
          href="https://open.kakao.com/me/lnc_manshair
"
          >오픈카톡</a
        >
      </v-card-text>
      <v-card-title class="ml-5"
        >🌏 &nbsp;<b>온라인문의 & 예약</b></v-card-title
      >
      <v-card-text class="ml-14"> 주소 www.lnc-hair.com</v-card-text>
      <v-divider class="mx-4"></v-divider>

      <v-card-title>PRICE LIST</v-card-title>
      <v-card-text>
        <v-btn @click="showPriceList" color="yellow" block
          ><b>가격표보기</b></v-btn
        >
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text :to="{ name: 'Booking' }">
          예약하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
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
      <th style="background-color:black"><font color="white">PERM</font></th>
    
    </tr>
    <tr>
      <td><br>맨즈컷 25,000<br><br>쥬니어컷 25,000</td>
      <td><br>다운펌(부분) 20,000<br><br>다운펌(전체) 50,000<br><br>콜드펌 90,000<br><br>아이롱펌 130,000<br><br>매직 110,000<br><br>컷트시 1만원 할인<br>&nbsp;</td>
    </tr>
    <tr>
      <th style="background-color:black"><font color="white">CLINIC</font></th>
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

<style></style>
