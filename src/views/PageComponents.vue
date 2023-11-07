<template>
    <div id="appBox">
        <div id="navBox">
            <ul>
                <li>
                    <button v-on:click="compo1">컴포넌트1</button>
                </li>
                <li>
                    <button v-on:click="compo2">컴포넌트2</button>
                </li>
                <li>
                    <button v-on:click="compo3">컴포넌트3</button>
                </li>
                <li>
                    <button v-on:click="compo4">컴포넌트4</button>
                </li>
                <li>
                    <button v-on:click="compo5">컴포넌트5</button>
                </li>
            </ul>

        </div>
        <div id="compoContainer">
            <div v-show="compNum == 1">
                <ComponentOne/>
            </div>
        
            <div v-show="compNum == 2">
                <ComponentTwo/>
            </div>

            <div v-show="compNum == 3">
                <ComponentThree/>
            </div>

            <div v-show="compNum == 4">
                <ComponentFour/>
            </div>

            <div v-show="compNum == 5">
                <ComponentFive/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import ComponentOne from '@/components/ComponentOne.vue';
    import ComponentTwo from '@/components/ComponentTwo.vue';
    import ComponentThree from '@/components/ComponentThree.vue';
    import ComponentFour from '@/components/ComponentFour.vue';
    import ComponentFive from '@/components/ComponentFive.vue';
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        el: "#appBox",
        components: {
            ComponentOne,
            ComponentTwo,
            ComponentThree,
            ComponentFour,
            ComponentFive,
        },
        data: function () {
            log("시작")
            return {
                compNum : 1 as any
            }
        },
        methods: {
            compo1() {
                this.compNum = 1;
            },

            compo2() {
                this.compNum = 2;
            },

            compo3() {
                this.compNum = 3;
            },

            compo4() {
                this.compNum = 4;
            },

            compo5() {
                this.compNum = 5;
            }
        }
    })
    
    function log(str: String){
        console.log(str)
    }

</script>

<style>
    h1{
        text-align: center;
    }
</style>

<style scoped>

    ul{
        padding-left: 30px;
    }

    li{
        margin: 10px;
        text-align: left;
    }

    #appBox{
        vertical-align: top;
        width: 1304px;
        text-align: left;
        margin: 0 auto;
    }

    #navBox{
        float: left;
        width: 200px;
        height: 200px;
        border: 1px solid #aaa;
        border-radius: 20px;
    }

    #compoContainer{
        display: inline-block;
        width: 1000px;
        height: 800px;
        border: 1px solid #aaa;
        border-radius: 20px;
        margin-left: 40px;
    }

</style>