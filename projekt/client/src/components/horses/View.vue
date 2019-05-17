<template>
  <div v-if="horse">
    <h1>It will be horse details page</h1>
    <HorseDetails :horse="horse" />
    <HorseNotes :notes="horse.wynik.noty" />
  </div>
</template>

<script>
import HorseDetails from "@/components/horses/Details";
import HorseNotes from "@/components/horses/Notes";

export default {
  components: {
    HorseDetails,
    HorseNotes
  },
  data: function() {
    return {
      horse: null
    };
  },
  props: {
    horseId: {}
  },
  mounted() {
    this.horse = this.$store.getters.fetchHorseById(this.horseId);
  }
};
</script>

<style scoped lang="less"></style>
