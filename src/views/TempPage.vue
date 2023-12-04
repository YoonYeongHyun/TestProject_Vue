<template>
    <div id="appBox">
        <div id="navBox">
            <ul>
                <li>
                    <button v-on:click="compo6">컴포넌트6</button>
                </li>
            </ul>

        </div>
        <div id="compoContainer">
            <div v-show="compNum == 6">
                <ComponentSix />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import ComponentSix from '@/components/ComponentSix.vue';
import { defineComponent } from 'vue'

export default defineComponent({
    el: "#appBox",
    components: {
        ComponentSix,
    },
    data: function () {
        log("시작")
        return {
            compNum: 6 as any
        }
    },
    methods: {
        compo6() {
            this.compNum = 6;
        }
    }
})

function log(str: String) {
    console.log(str)
}

</script>

<style>
h1 {
    text-align: center;
}
</style>

<style scoped>
ul {
    padding-left: 30px;
}

li {
    margin: 10px;
    text-align: left;
}

#appBox {
    vertical-align: top;
    width: 1304px;
    text-align: left;
    margin: 0 auto;
}

#navBox {
    float: left;
    width: 200px;
    height: 200px;
    border: 1px solid #aaa;
    border-radius: 20px;
}

#compoContainer {
    display: inline-block;
    width: 1000px;
    height: 800px;
    border: 1px solid #aaa;
    border-radius: 20px;
    margin-left: 40px;
}
</style>