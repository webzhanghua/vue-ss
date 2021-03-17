<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="pm子项目" />
    <pm-explain />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import PmExplain from "./components/pm-explain.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    PmExplain
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
