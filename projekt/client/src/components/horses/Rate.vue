<template>
  <div class="container" v-if="Object.keys(horse).length !== 0">
    <h1>
      Ocenianie konia {{ horse.nazwa }} ({{ horse.kraj }}) - klasa
      {{ horse.klasa }}
    </h1>

    <table>
      <thead>
        <tr>
          <th class="black-cell">Sędzia</th>
          <th v-for="(noteName, index) in notesName" :key="index">
            {{ noteName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(judge, index) in judges" :key="judge">
          <td class="black-cell">{{ getJudge(judge).sedzia }}</td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].typ"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].glowa"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].kloda"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].nogi"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].ruch"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <a class="btn-add" @click="saveForm">Zapisz</a>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      errors: [],
      horse: {},
      judges: [],
      notesName: ["Typ", "Głowa", "Kłoda", "Nogi", "Ruch"]
    };
  },
  mounted() {
    this.horseId = this.$router.currentRoute.params.horseId;
    this.horse = this.$store.getters.fetchHorseById(this.horseId);
    this.getJudges();
  },
  methods: {
    getJudges: function() {
      this.judges = this.$store.getters.fetchClassByNumber(
        this.horse.klasa
      ).komisja;
    },
    getJudge: function(id) {
      return this.$store.getters.fetchJudgeById(id);
    },

    saveForm: function() {
      const self = this;

      axios
        .put("http://localhost:4000/konie/" + this.horse._id, this.horse)
        .then(function() {
          self.$store.dispatch("fetchAllHorses");
          self.$router.push({
            name: "horses"
          });
        });
    }
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

  table {
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 20px;
    width: 100%;

    .black-cell {
      background: #000;
      color: #fff;
      font-weight: 700;
    }

    input {
      font-size: inherit;
      font-family: inherit;
    }

    th {
      background: grey;
      color: #fff;
    }
  }

  table,
  th,
  td {
    text-align: left;
    border: 1px solid black;
    padding: 5px;
  }
}
</style>
