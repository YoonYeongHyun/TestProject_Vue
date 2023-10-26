<template>
    <div id="componentFive">
        <h1>컴포넌트5</h1>
    </div>
</template>

<script>
export default {
    el: "#componentFive",
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