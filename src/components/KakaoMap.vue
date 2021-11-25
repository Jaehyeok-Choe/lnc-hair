<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="400" elevation="24" outlined shaped>
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div>
        <div id="map"></div>
        <div class="mt-3 ml-3">
          <v-btn @click="displayMarker(markerPositions1)" color="black" dark
            >위치보기</v-btn
          >
          <v-btn @click="displayInfoWindow" color="black" dark>도로명</v-btn>
        </div>
      </div>

      <v-card-title>💈 L.N.C - MEN's Hair & M-up</v-card-title>

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

          <div class="grey--text ms-4">The Best Ever</div>
        </v-row>

        <div class="my-4 text-subtitle-1">울산광역시 남구</div>

        <div>
          도로명: 울산광역시 남구 달삼로75번길 11 2층 <br />
          지번: 울산광역시 남구 삼산동 1476-12 2층 <br /><br />
          전화: 010-6009-4610 / 070-7537-2678
        </div>
      </v-card-text>

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
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markerPositions1: [[35.53788890985835, 129.3369543269782]],
      markers: [],
      infowindow: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
    }
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
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(35.53788890985835, 129.3369543269782),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent =
          '<div style="padding:5px;">울산 남구 달삼로75번길 11, 2층 &nbsp;&nbsp;&nbsp;&nbsp; </div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(
          35.53788890985835,
          129.3369543269782
        ), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 400;
  height: 350px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
