<template>
  <div>
    <h1>Klasy koni oraz składy komisji</h1>
    <ClassesIndex :classes="classes" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClassesIndex from "@/components/classes/List.vue";
export default {
  components: {
    ClassesIndex
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
