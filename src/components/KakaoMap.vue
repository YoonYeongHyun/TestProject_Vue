<template>
    <div id="map">
    </div>    
</template>

<script >
export default {
    name: "KakaoMap",
    el: "#map",
    data: function () {
        log("시작")
        return {
            map: null,
        };
    },
    mounted(){
        if(window.kakao && window.kakao.maps) {
            this.loadMap();
        } else {
            this.loadScript();
        }
    },
    methods: {

        loadScript() {
            const script = document.createElement("script");
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=0bc7e16f5aa2c3b8ef84ad553ad04a00&autoload=false"
            script.onload = () => window.kakao.maps.load(this.loadMap);
            document.head.appendChild(script)
        },

        loadMap(){
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level:3 //확대 레벨
            }
            this.map = new window.kakao.maps.Map(container, options);
            this.loadMaker();
        },

        loadMaker(){
            const markerPosition = new window.kakao.maps.LatLng( 33.45, 126.57);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            })
            marker.setMap(this.map);
        }
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
</style>