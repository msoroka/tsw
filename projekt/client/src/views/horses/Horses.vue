<template>
  <div>
    <h1>It will be horses page</h1>
    <HorsesIndex :horses="horses" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HorsesIndex from "@/components/horses/Index.vue";
export default {
  components: {
    HorsesIndex
  },
  mounted() {
    this.$store.dispatch("fetchAllHorses");
  },
  computed: {
    ...mapState(["horses"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
