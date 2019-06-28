<template>
  <div>
    <h1>Ranking koni - klasa {{ currentClass }}</h1>
    <div class="container">
      <div class="classes">
        <ul>
          <li
            v-on:click="getClassResult(cl.numer)"
            v-bind:key="cl._id"
            v-for="cl in classes"
            v-if="$store.getters.fetchHorsesByClass(cl.numer).length"
          >
            <span>{{ cl.numer }} - {{ cl.kat }}</span>
            <span v-if="cl.status === 'kolejka'">W kolejce</span>
            <span v-if="cl.status === 'trwa'">Aktualnie rozgrywana</span>
            <span v-if="cl.status === 'koniec'">Zakończona</span>
          </li>
        </ul>
      </div>
      <div class="results">
        <p v-if="horses.length === 0">Brak koni w tej klasie.</p>
        <ol>
          <li
            v-bind:key="horse._id"
            v-for="horse in horses"
            v-if="horse.klasa == currentClass"
          >
            <a @click="viewHorse(horse._id)"
              >{{ horse.nazwa }} ({{ horse.kraj }})
              {{ getHorsePoints(horse) }}pkt
<!--              <span v-if="$store.getters.getHorsesWithIdentNotes(horse).length">-->
<!--                + rozjemca {{ horse.wynik.rozjemca }}-->
<!--              </span>-->
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      horses: {},
      classes: {},
      currentClass: 0,
      previous: 0,
      next: 0
    };
  },
  sockets: {
    ranking: function(data) {
      this.horses = data;
    },
    klasa: function(data) {
      this.classes = data;
    }
  },
  mounted() {
    this.$socket.emit("klasa");
    this.$socket.emit("ranking");
    if (localStorage.getItem("classResult")) {
      this.currentClass = localStorage.getItem("classResult");
    } else {
      this.currentClass = this.$store.state.classes[0].numer;
      localStorage.setItem("classResult", this.$store.state.classes[0].numer);
    }
  },
  methods: {
    getClassResult: function(num) {
      this.currentClass = num;
      localStorage.setItem("classResult", num);
      this.$socket.emit("ranking", num);
    },
    getHorsePoints: function(horse) {
      return this.$store.getters.getHorsePoints(horse);
    },
    viewHorse: function(horseId) {
      this.$router.push({
        name: "horse",
        params: {
          horseId: horseId
        }
      });
    },
    classHasHorses: function(cl) {
      return this.$store.getters.classHasHorses(cl);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1 {
  text-align: center;
}
.container {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .classes {
    width: 40vw;
    text-align: left;

    ul {
      list-style: none;

      li {
        padding: 10px;
        margin: 5px 0;
        background: #cccccc;
        font-weight: 700;
        display: flex;
        justify-content: space-between;

        &:hover {
          background: #eeeeee;
          cursor: pointer;
        }
      }
    }
  }

  .results {
    width: 40vw;
    ol {
      li {
        font-size: 25px;
        &:hover {
          cursor: pointer;
        }

        &:nth-child(1) {
          font-weight: 700;
          font-size: 30px;
        }
        &:nth-child(2) {
          font-weight: 700;
          font-size: 27px;
        }
        &:nth-child(3) {
          font-weight: 700;
          font-size: 25px;
        }
      }
    }
  }
}
</style>
