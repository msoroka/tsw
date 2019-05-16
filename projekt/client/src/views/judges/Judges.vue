<template>
  <div>
    <h1>It will be judges page</h1>
    <JudgesIndex :judges="judges" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import JudgesIndex from "@/components/judges/Index.vue";
export default {
  components: {
    JudgesIndex
  },
  mounted() {
    this.$store.dispatch("fetchAllJudges");
  },
  computed: {
    ...mapState(["judges"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
