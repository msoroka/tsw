<template>
  <div class="container">
    <div v-for="(cl, index) in classes" :key="cl.id">
      <span v-if="cl.numer === currentClass">
        <div class="carousel">
          <button
            :disabled="index === 0"
            @click="getHorsesByClass(cl.numer - 1)"
          >
            <i class="arrow left"></i>
          </button>
          <span>Klasa: {{ cl.numer }}<br />Kategoria: {{ cl.kat }}</span>
          <button
            :disabled="index === classes.length - 1"
            @click="getHorsesByClass(cl.numer + 1)"
          >
            <i class="arrow right"></i>
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
        <tr v-for="horse in horses" :key="horse._id">
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
import axios from "axios";

export default {
  data: function() {
    return {
      horses: {},
      currentClass: 0,
      previous: 0,
      next: 0
    };
  },
  mounted() {
    if (localStorage.getItem("class")) {
      this.getHorsesByClass(parseInt(localStorage.getItem("class")));
      this.currentClass = parseInt(localStorage.getItem("class"));
    } else {
      this.getHorsesByClass(this.classes[0].numer);
      this.currentClass = this.classes[0].numer;
    }
  },
  computed: {
    ...mapState(["classes"])
  },
  methods: {
    getHorsesByClass: function(cl) {
      localStorage.setItem("class", cl);
      this.currentClass = parseInt(cl);
      this.horses = this.$store.getters.fetchHorsesByClass(cl);
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
      const self = this;

      axios.delete("http://localhost:4000/konie/" + id).then(function() {
        self.$store.dispatch("fetchAllHorses").then(function() {
          self.$router.push({
            name: "horses"
          });
        });
      });
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
    margin-top: 20px;
    width: 100%;

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
