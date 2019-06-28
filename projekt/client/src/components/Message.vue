<template>
  <div
    class="message"
    v-show="this.$store.state.displayMessage"
    v-on:click="hide"
  >
    <span>{{ $store.state.message }}</span>
  </div>
</template>

<script>
export default {
  name: "Message",
  methods: {
    hide: function() {
      this.$store.state.displayMessage = false;
    }
  }
};
</script>

<style scoped lang="less">
.message {
  width: 90vw;
  height: auto;
  margin: 20px auto;
  text-align: center;
  padding: 5px 0;
  background: #ccc;
  font-size: 30px;
  font-weight: 700;
}
</style>
