<template>
  <div class="container" v-if="this.horses">
    <div v-for="(cl, index) in classes" :key="cl.id">
      <span v-if="cl.numer === currentClass">
        <div class="carousel">
          <button
            :disabled="index === 0"
            @click="getHorsesByClass(classes[index - 1].numer)"
          >
            <i class="arrow left"></i>
          </button>
          <span
            >Klasa: {{ classes[index].numer }}<br />Kategoria:
            {{ classes[index].kat }}</span
          >
          <button
            :disabled="index === classes.length - 1"
            @click="getHorsesByClass(classes[index + 1].numer)"
          >
            <i class="arrow right"></i>
          </button>
        </div>
        <div class="status-buttons">
          <button
            :disabled="cl.status == 'kolejka'"
            v-on:click="changeStatus(cl, 'kolejka')"
          >
            W kolejce
          </button>
          <button
            :disabled="cl.status == 'trwa'"
            v-on:click="changeStatus(cl, 'trwa')"
          >
            Aktualnie rozgrywana
          </button>
          <button
            :disabled="cl.status == 'koniec'"
            v-on:click="changeStatus(cl, 'koniec')"
          >
            Zakończona
          </button>
        </div>
      </span>
    </div>
    <table v-if="horses.length > 0" class="table table-striped">
      <thead>
        <tr>
          <th>Numer</th>
          <th>Nazwa</th>
          <th>Kraj</th>
          <th>Rocznik</th>
          <th>Płeć</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="horse in horses"
          :key="horse._id"
          :class="{ 'rozjemca-background': getRozjemca(horse) }"
          v-if="horse.klasa == currentClass"
        >
          <td class="td-action">{{ horse.numer }}</td>
          <td>{{ horse.nazwa }}</td>
          <td>{{ horse.kraj }}</td>
          <td>{{ horse.rocznik }}</td>
          <td>{{ horse.plec }}</td>
          <td class="td-action">
            <router-link
              class="btn-edit"
              :to="{ name: 'horses.edit', params: { horseId: horse._id } }"
              >Edytuj</router-link
            >
            <a class="btn-remove" @click="removeHorse(horse._id)">Usuń</a>
            <router-link
              class="btn-rate"
              :to="{ name: 'horses.rate', params: { horseId: horse._id } }"
              >Oceń</router-link
            >
            <a class="btn-view" @click="viewHorse(horse._id)">Szczegóły</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Brak danych</p>
    <router-link class="btn-add" to="horses/create"
      >Dodaj nowego konia</router-link
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      // horses: {},
      classes: {},
      currentClass: 0,
      previous: 0,
      next: 0
    };
  },
  sockets: {
    klasa: function(data) {
      this.classes = data;
    }
  },
  computed: {
    ...mapState(["horses"])
  },
  mounted() {
    // console.log(this.horses);
    this.$store.dispatch("fetchAllClasses");
    // this.$store.dispatch("fetchAllHorses");
    this.$socket.emit("klasa");
    if (localStorage.getItem("class")) {
      this.getHorsesByClass(parseInt(localStorage.getItem("class")));
      this.currentClass = parseInt(localStorage.getItem("class"));
    } else {
      this.getHorsesByClass(this.$store.state.classes[0].numer);
      this.currentClass = this.$store.state.classes[0].numer;
    }
  },
  methods: {
    getHorsesByClass: function(cl) {
      localStorage.setItem("class", cl);
      this.currentClass = parseInt(cl);
      // this.horses = this.$store.getters.fetchHorsesByClass(cl);
    },
    viewHorse: function(horseId) {
      this.$router.push({
        name: "horse",
        params: {
          horseId: horseId
        }
      });
    },
    removeHorse: function(id) {
      this.$store.dispatch("removeHorse", id).then(() => {
        // this.$store.dispatch("fetchAllHorses").then(() => {
        this.$socket.emit("ranking");
        this.getHorsesByClass(parseInt(localStorage.getItem("class")));
        this.$router.push({
          name: "horses"
        });
        // });
      });
    },
    changeStatus: function(cl, status) {
      this.$socket.emit("klasa", {
        klasa: cl,
        status: status
      });
    },
    getRozjemca: function(horse) {
      return (
        !!this.$store.getters.getHorsesWithIdentNotes(horse).length &&
        horse.wynik.rozjemca == 0
      );
    }
  }
};
</script>

<style scoped lang="less">
@bordered: 1px solid darken(lightgrey, 20%);

.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .status-buttons {
    display: flex;
    justify-content: center;
    margin: 20px;

    button {
      margin: 10px;
      padding: 5px 20px;
      font-size: inherit;
      background: darken(lightgrey, 20%);
      font-weight: 700;
      color: #fff;

      &:disabled {
        background: #000;
      }
    }
  }

  .carousel {
    display: flex;
    flex-direction: row;
    justify-content: center;

    span {
      text-align: center;
      padding: 5px;
      width: 30vw;
      background: darken(lightgrey, 30%);
      color: #fff;
      border-top: @bordered;
      border-bottom: @bordered;
      font-weight: 700;
    }

    button {
      width: 50px;
      background: darken(lightgrey, 10%);
      border: @bordered;

      i {
        border: solid #fff;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;

        &.right {
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
        }
        &.left {
          transform: rotate(135deg);
          -webkit-transform: rotate(135deg);
        }
      }
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;

    .rozjemca-background {
      background: #ffcccc;
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
