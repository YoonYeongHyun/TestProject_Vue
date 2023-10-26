<template>
    <div id="componentOne">
        <h1>카카오지도</h1>
        <KakaoMap/>
    </div>
</template>
<script>
    import KakaoMap from "./KakaoMap.vue"
    export default {
        el: "#componentOne",
        data: function () {
            log("시작")

            return {
                object: "",
            }
        },
        components:{
            KakaoMap,
        },
        methods: {
        }
    }
    function log(str) {
        console.log(str)
    }
</script>

<style scoped>
</style>