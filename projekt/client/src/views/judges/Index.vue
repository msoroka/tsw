<template>
  <div>
    <h1>Sędziowie oceniający pokazy</h1>
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
    // this.$store.dispatch("fetchAllJudges");
  },
  computed: {
    ...mapState(["judges"])
  }
};
</script>

<style scoped lang="less">
h1 {
  text-align: center;
}
</style>
