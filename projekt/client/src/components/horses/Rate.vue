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
            <span class="form-error" v-if="errors[index]">
              {{ errors[index].typ }}
            </span>
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].glowa"
            />
            <span class="form-error" v-if="errors[index]">
              {{ errors[index].glowa }}
            </span>
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].kloda"
            />
            <span class="form-error" v-if="errors[index]">
              {{ errors[index].kloda }}
            </span>
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].nogi"
            />
            <span class="form-error" v-if="errors[index]">
              {{ errors[index].nogi }}
            </span>
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              v-model="horse.wynik.noty[index].ruch"
            />
            <span class="form-error" v-if="errors[index]">
              {{ errors[index].ruch }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="this.$store.getters.getHorsesWithIdentNotes(horse).length !== 0">
      <h3>Ocena rozjemcy: {{ horse.wynik.rozjemca }}</h3>
      <h3>Ocena wymaga interwencji rozjemcy</h3>
      <p>Konie z taką samą punktacją:</p>
      <ul>
        <li
          v-bind:key="h._id"
          v-for="h in this.$store.getters.getHorsesWithIdentNotes(horse)"
        >
          {{ h.nazwa }} - wynik rozjemcy {{ h.wynik.rozjemca }}
        </li>
      </ul>
      <input type="text" v-model="horse.wynik.rozjemca" />
    </div>
    <a class="btn-add" @click="saveForm">Zapisz</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errors: {},
      horse: {},
      judges: [],
      notesName: ["Typ", "Głowa", "Kłoda", "Nogi", "Ruch"],
      tempRozj: 0
    };
  },
  mounted() {
    this.horseId = this.$router.currentRoute.params.horseId;
    this.horse = this.$store.getters.fetchHorseById(this.horseId);
    this.cl = this.$store.getters.fetchClassByNumber(this.horse.klasa);

    for (let i = 0; i < this.cl.komisja.length; i++) {
      if (!this.horse.wynik.noty[i]) {
        this.horse.wynik.noty.push({
          typ: 0,
          glowa: 0,
          kloda: 0,
          nogi: 0,
          ruch: 0
        });
      }
    }

    console.log(this.horse);

    this.getJudges();
    this.tempRozj = this.horse.wynik.rozjemca;
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
    getHorse: function(id) {
      return this.$store.getters.fetchHorseById(id);
    },
    saveForm: function(e) {
      let errorsCounter = 0;
      this.errors = {};
      this.horse.wynik.noty.forEach((note, idx) => {
        this.errors[idx] = {};
        if (note.glowa < 0 || note.glowa > 20) {
          this.errors[idx]["glowa"] = "Proszę podać wartość od 0 do 20";
          errorsCounter++;
        }
        if (note.kloda < 0 || note.kloda > 20) {
          this.errors[idx]["kloda"] = "Proszę podać wartość od 0 do 20";
          errorsCounter++;
        }
        if (note.nogi < 0 || note.nogi > 20) {
          this.errors[idx]["nogi"] = "Proszę podać wartość od 0 do 20";
          errorsCounter++;
        }
        if (note.ruch < 0 || note.ruch > 20) {
          this.errors[idx]["ruch"] = "Proszę podać wartość od 0 do 20";
          errorsCounter++;
        }
        if (note.typ < 0 || note.typ > 20) {
          this.errors[idx]["typ"] = "Proszę podać wartość od 0 do 20";
          errorsCounter++;
        }
      });
      if (errorsCounter > 0) {
        e.preventDefault();
        return false;
      } else {
        this.$store.dispatch("editHorse", this.horse).then(() => {
          this.$socket.emit("ranking", this.horse.klasa);
          this.$store.dispatch("fetchAllHorses").then(() => {
            this.$router.push({
              name: "horses"
            });
          });
        });
      }
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

    .form-error {
      color: red;
      font-size: 10px;
      display: block;
    }
  }
}
</style>
