<template>
    <div id="map">
    </div>
    <div id="searchBox">
        <input type="text" v-model="searchTxt" placeholder="검색하세요">
        <button v-on:click="btnSearch">검색</button>
    </div>
    <div class="btn_box">
        <!--
        <button v-on:click="btnYang">양재</button>
        <button v-on:click="btnBang">방배</button>
        <button v-on:click="btnYeok">역삼</button>
        <button v-on:click="btnMoon">문래</button>
        -->
    </div>
    <p id="latLngText"></p>
</template>

<script >
    var latlng;
    var lat;
    var long;
    var latLngText;
    var markers = [];
    export default {
        name: "KakaoMap",
        el: "#map",
        data: function () {
            return {
                map: null,
                lat : 37.47882954652135,
                long : 127.00622382693767,
                searchTxt : "",
            };
        },

        mounted(){
            window.kakao && window.kakao.maps
            ? this.loadMap()
            : this.loadScript();
        },

        methods: {
            loadScript() {
                const script = document.createElement("script");
                script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=0bc7e16f5aa2c3b8ef84ad553ad04a00&libraries=services&autoload=false";
                script.onload = () => window.kakao.maps.load(this.loadMap);
                document.head.appendChild(script);
            },

            loadMap(){
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(this.lat, this.long),
                    level:3 //확대 레벨
                }
                this.map = new window.kakao.maps.Map(container, options);
                this.loadMaker();
            },

            loadMaker(){
                const markerPosition = new window.kakao.maps.LatLng(this.lat, this.long);
                var marker = new window.kakao.maps.Marker({
                    position: markerPosition
                })
                marker.setMap(this.map);
                
                window.kakao.maps.event.addListener(this.map, 'click', (mouseEvent) => {
                    latlng = mouseEvent.latLng;
                    lat = latlng.getLat();
                    long = latlng.getLng();
                    latLngText = '클릭한 위치의 위도는 ' + lat + ' 이고, '
                                + '경도는 ' + long + ' 입니다';
                    var latLngTextElement = document.getElementById("latLngText");
                    latLngTextElement.innerText = latLngText;
                    marker.setPosition(latlng);
                    log(mouseEvent);
                });
            },

            btnSearch(){
                var geocoder = new window.kakao.maps.services.Geocoder();
                var searchTxtFinal = '%' + this.searchTxt + '%'
                geocoder.addressSearch(searchTxtFinal, (result, status) => {

                    // 정상적으로 검색이 완료됐으면 
                    if (status === window.kakao.maps.services.Status.OK) {
                        /*
                        if(result.length > 5){
                            alert("더 자세히 기입하세요");
                            return;
                        }
                        */
                        log(this.map);
                        log(markers)
                        
                        markers.forEach(element => {
                            log(element);
                            //element.setMap(null);
                            return;
                        });

                        markers = [];
                        log(markers);
                        var firstCoords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                        result.forEach(element => {
                            var coords = new window.kakao.maps.LatLng(element.y, element.x);
                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new window.kakao.maps.Marker({
                                map: this.map,
                                position: coords
                            });
                            marker.setPosition(coords);
                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            var infowindow = new window.kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + element.address_name + '</div>'
                            });
                            infowindow.open(this.map, marker);
                            markers.push(marker);
                        });
                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        this.map.setCenter(firstCoords);
                        
                        latLngText = '검색한 위치의 위도는 ' + result[0].y + ' 이고, '
                            + '경도는 ' + result[0].x + ' 입니다';
                        var latLngTextElement = document.getElementById("latLngText");
                        latLngTextElement.innerText = latLngText;
                    }
                });
            },
        }
    }

    function log(str) {
        console.log(str)
    }

</script>

<style scoped>
    #map{
        margin: 0 auto;
        width: 90%;
        height: 550px;
        border: 2px solid #000;
        border-radius: 20px;
    }
    
    button{
        margin: 10px;
    }
    input{
        margin: 10px;
    }

    p{
        text-align: center;
        font-size: 1.3em;
        font-weight: bold;
    }
</style>