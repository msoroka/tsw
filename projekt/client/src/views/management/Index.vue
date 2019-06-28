<template>
  <div>
    <h1>Panel importu</h1>
    <Management />
  </div>
</template>

<script>
import Management from "@/components/management/Panel.vue";
export default {
  components: {
    Management
  }
};
</script>

<style scoped lang="less">
h1 {
  text-align: center;
}
</style>
