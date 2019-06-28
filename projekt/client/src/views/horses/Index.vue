<template>
  <div>
    <HorsesIndex />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HorsesIndex from "@/components/horses/List.vue";
export default {
  components: {
    HorsesIndex
  },
  // mounted() {
  //   this.$store.dispatch("fetchAllHorses");
  // },
  computed: {
    ...mapState(["horses"])
  }
};
</script>

<style scoped lang="less"></style>
