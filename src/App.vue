<template>
  <MainHeader />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import MainHeader from './components/MainHeader.vue';
@Options({
  components: {
    HelloWorld,
    MainHeader,
  },
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button, input, select, textarea {
    border-style: solid !important;
    border: 1px soild black;
    border-width: 1px !important; 
}

</style>