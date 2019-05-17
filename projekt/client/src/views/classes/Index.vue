<template>
  <div>
    <h1>It will be classes page</h1>
    <ClassesIndex :classes="classes"/>
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
    this.$store.dispatch("fetchAllClasses");
  },
  computed: {
    ...mapState(["classes"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
