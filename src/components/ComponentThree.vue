<template>
    <h1>컴포넌트3</h1>
    <div id="componentThree">
    </div>
</template>

<script>
export default {
    el: "#componentThree",
    data: function () {
        log("시작")

        return {
            styleObject: {
            },
        }
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