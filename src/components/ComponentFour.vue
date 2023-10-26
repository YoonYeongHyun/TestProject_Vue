<template>
    <div id="componentFour">
        <h1>컴포넌트4</h1>
    </div>
</template>

<script>
export default {
    el: "#componentFour",
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