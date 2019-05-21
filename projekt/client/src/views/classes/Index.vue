<template>
  <div>
    <h1>Klasy koni oraz składy komisji</h1>
    <ClassesIndex :classes="classes" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClassesIndex from "@/components/classes/Index.vue";
export default {
  components: {
    ClassesIndex
  },
  mounted() {
    // this.$store.dispatch("fetchAllClasses");
  },
  computed: {
    ...mapState(["classes"])
  }
};
</script>

<style scoped lang="less">
h1 {
  text-align: center;
}
</style>
