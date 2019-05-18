<template>
  <div id="app">
    <Navbar />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch("fetchAllHorses");
    this.$store.dispatch("fetchAllClasses");
    this.$store.dispatch("fetchAllJudges");
  },
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
