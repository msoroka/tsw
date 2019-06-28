<template>
  <div class="container">
    <button v-on:click="importJudges">Import sędziów</button>
    <button v-on:click="importHorses">Import koni</button>
    <button v-on:click="importClasses">Import klas</button>
  </div>
</template>

<script>
export default {
  name: "Panel",
  methods: {
    importJudges: function() {
      this.$store.dispatch("importJudges").then(() => {
        this.$store.dispatch("fetchAllJudges");
      });
    },
    // importHorses: function() {
    //   this.$store.dispatch("importHorses").then(() => {
    //     this.$store.dispatch("fetchAllHorses");
    //   });
    // },
    // importClasses: function() {
    //   this.$store.dispatch("importClasses").then(() => {
    //     this.$store.dispatch("fetchAllClasses");
    //   });
    // }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 30vw;
  margin: 0 auto;
  button {
    display: block;
    width: 100%;
    text-align: center;
    margin: 20px 0;
    padding: 20px 50px;
    font-size: 25px;
    font-weight: bold;
    background: lightgrey;
  }
}
</style>
