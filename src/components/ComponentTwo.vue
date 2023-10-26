<template>
    <div id="componentTwo">
        <h1>컴포넌트2</h1>
    </div>
</template>

<script>
export default {
    el: "#componentTwo",
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