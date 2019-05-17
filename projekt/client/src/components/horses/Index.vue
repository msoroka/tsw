<template>
  <div class="container">
    <span v-for="cl in classes" :key="cl.id">
      <button @click="getHorsesByClass(cl.numer)">
        Klasa: {{ cl.numer }} // Kategoria: {{ cl.kat }}
      </button>
    </span>
    <table v-if="horses.length > 0" class="table table-striped">
      <thead>
        <tr>
          <th>Klasa</th>
          <th>Nazwa</th>
          <th>Kraj</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.klasa }}</td>
          <td>{{ horse.nazwa }}</td>
          <td>{{ horse.kraj }}</td>
          <td>
            <router-link :to="{ name: 'horse', params: { horseId: horse.id } }">
              <button>View</button></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Proszę wybrać klasę</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function() {
    return {
      horses: {}
    };
  },
  mounted() {
    this.$store.dispatch("fetchAllClasses");
    this.loadHorses();
  },
  computed: {
    ...mapState(["classes"]),
    compute: function() {
      this.loadHorses();
    }
  },
  methods: {
    getHorsesByClass: function(cl) {
      localStorage.setItem("classId", cl);
      this.horses = this.$store.getters.fetchHorsesByClass(cl);
    },
    loadHorses: function() {
      let classId = localStorage.getItem("classId");

      console.log(classId);

      if (classId) {
        this.getHorsesByClass(classId);
      }
    }
  }
};
</script>

<style scoped></style>
