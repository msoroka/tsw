<template>
  <div>
    <h1>Ranking koni</h1>
    <div class="container">
      <div class="classes">
        <ul>
          <li
            v-on:click="getClassResult(cl.numer)"
            v-bind:key="cl._id"
            v-for="cl in classes"
            v-if="classHasHorses(cl.numer)"
          >
            {{ cl.numer }} - {{ cl.kat }}
          </li>
        </ul>
      </div>
      <div class="results">
        <p v-if="horses.length === 0">Brak koni w tej klasie.</p>
        <ol>
          <li v-bind:key="horse._id" v-for="horse in horses">
            <a @click="viewHorse(horse._id)"
              >{{ horse.nazwa }} ({{ horse.kraj }})
              {{ getHorsePoints(horse) }}pkt
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      horses: {},
      currentClass: 0,
      previous: 0,
      next: 0
    };
  },
  sockets: {
    ranking: function(data) {
      this.horses = data;
    }
  },
  computed: {
    ...mapState(["classes"])
  },
  mounted() {
    if (localStorage.getItem("classResult")) {
      this.$socket.emit("ranking", localStorage.getItem("classResult"));
    }
  },
  methods: {
    getClassResult: function(num) {
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
    classHasHorses: function (cl) {
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
    width: 33%;
    text-align: left;
    ul {
      list-style: none;

      li {
        padding: 10px;
        margin: 5px 0;
        background: #cccccc;
        font-weight: 700;

        &:hover {
          background: #eeeeee;
          cursor: pointer;
        }
      }
    }
  }

  .results {
    width: 33%;
    ol {
      li {
        font-size: 20px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
