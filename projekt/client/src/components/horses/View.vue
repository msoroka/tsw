<template>
  <div class="container" v-if="horse">
    <h1>Szczegóły konia {{ horse.nazwa }} ({{ horse.kraj }})</h1>
    <HorseDetails :horse="horse" />
    <HorseNotes :notes="horse.wynik.noty" :horse="horse" />
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

<style scoped lang="less">
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
  }
}
</style>
