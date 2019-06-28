<template>
  <div v-if="Object.keys(horse).length !== 0" class="container">
    <h1>Edytuj konia</h1>
    <div class="form">
      <div class="form-col">
        <h3>Dane konia</h3>
        <div class="form-group">
          <label for="numer">Numer</label>
          <input
            type="number"
            min="1"
            max="9999"
            step="1"
            id="numer"
            v-model="horse.numer"
          />
          <span class="form-error" v-if="errors['horse.numer']">{{
            errors["horse.numer"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.nazwa">Nazwa</label>
          <input type="text" id="horse.nazwa" v-model="horse.nazwa" />
          <span class="form-error" v-if="errors['horse.nazwa']">{{
            errors["horse.nazwa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.klasa">Klasa</label>
          <select
            class="form-country"
            v-if="countries"
            id="horse.klasa"
            v-model="horse.klasa"
            name=""
          >
            <option
              :key="cl.numer"
              v-for="cl in classes"
              v-bind:value="cl.numer"
              >{{ cl.numer }} - {{ cl.kat }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.klasa']">{{
            errors["horse.klasa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="kraj">Kraj</label>
          <select
            class="form-country"
            v-if="countries"
            id="kraj"
            v-model="horse.kraj"
            name=""
          >
            <option
              :key="country.code"
              v-for="country in countries"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.kraj']">{{
            errors["horse.kraj"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="rocznik">Rocznik</label>
          <input
            type="number"
            min="1990"
            max="2020"
            step="1"
            id="rocznik"
            v-model="horse.rocznik"
          />
          <span class="form-error" v-if="errors['horse.rocznik']">{{
            errors["horse.rocznik"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.plec">Płeć</label>
          <select
            class="form-country"
            id="horse.plec"
            v-model="horse.plec"
            name=""
          >
            <option value="klacz">Klacz</option>
            <option value="ogier">Ogier</option>
          </select>
          <span class="form-error" v-if="errors['horse.plec']">{{
            errors["horse.plec"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.masc">Maść</label>
          <input type="text" id="horse.masc" v-model="horse.masc" />
          <span class="form-error" v-if="errors['horse.masc']">{{
            errors["horse.masc"]
          }}</span>
        </div>
      </div>
      <div class="form-col">
        <h3>Właściciel i hodowca</h3>
        <h4>Właściciel</h4>
        <div class="form-group">
          <label for="horse.wlasciciel.nazwa">Nazwa</label>
          <input
            type="text"
            id="horse.wlasciciel.nazwa"
            v-model="horse.wlasciciel.nazwa"
          />
          <span class="form-error" v-if="errors['horse.wlasciciel.nazwa']">{{
            errors["horse.wlasciciel.nazwa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.wlasciciel.kraj">Kraj</label>
          <select
            class="form-country"
            v-if="countries"
            id="horse.wlasciciel.kraj"
            v-model="horse.wlasciciel.kraj"
            name=""
          >
            <option
              :key="country.code"
              v-for="country in countries"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.wlasciciel.kraj']">{{
            errors["horse.wlasciciel.kraj"]
          }}</span>
        </div>
        <h4>Hodowca</h4>
        <div class="form-group">
          <label for="horse.hodowca.nazwa">Nazwa</label>
          <input
            type="text"
            id="horse.hodowca.nazwa"
            v-model="horse.hodowca.nazwa"
          />
          <span class="form-error" v-if="errors['horse.hodowca.nazwa']">{{
            errors["horse.hodowca.nazwa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.wlasciciel.kraj">Kraj</label>
          <select
            class="form-country"
            v-if="countries"
            id="horse.hodowca.kraj"
            v-model="horse.hodowca.kraj"
            name=""
          >
            <option
              :key="country.code"
              v-for="country in countries"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.hodowca.kraj']">{{
            errors["horse.hodowca.kraj"]
          }}</span>
        </div>
      </div>
      <div class="form-col">
        <h3>Rodowód</h3>
        <h4>Ojciec</h4>
        <div class="form-group">
          <label for="horse.rodowod.o.nazwa">Nazwa</label>
          <input
            type="text"
            id="horse.rodowod.o.nazwa"
            v-model="horse.rodowod.o.nazwa"
          />
          <span class="form-error" v-if="errors['horse.rodowod.o.nazwa']">{{
            errors["horse.rodowod.o.nazwa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.rodowod.o.kraj">Kraj</label>
          <select
            class="form-country"
            v-if="countries"
            id="horse.rodowod.o.kraj"
            v-model="horse.rodowod.o.kraj"
            name=""
          >
            <option
              :key="country.code"
              v-for="country in countries"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.rodowod.o.kraj']">{{
            errors["horse.rodowod.o.kraj"]
          }}</span>
        </div>
        <h4>Matka</h4>
        <div class="form-group">
          <label for="horse.rodowod.m.nazwa">Nazwa</label>
          <input
            type="text"
            id="horse.rodowod.m.nazwa"
            v-model="horse.rodowod.m.nazwa"
          />
          <span class="form-error" v-if="errors['horse.rodowod.m.nazwa']">{{
            errors["horse.rodowod.m.nazwa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.rodowod.m.kraj">Kraj</label>
          <select
            class="form-country"
            v-if="countries"
            id="horse.rodowod.m.kraj"
            v-model="horse.rodowod.m.kraj"
            name=""
          >
            <option
              :key="country.code"
              v-for="country in countries"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.rodowod.m.kraj']">{{
            errors["horse.rodowod.m.kraj"]
          }}</span>
        </div>
        <h4>Ojciec matki</h4>
        <div class="form-group">
          <label for="horse.rodowod.om.nazwa">Nazwa</label>
          <input
            type="text"
            id="horse.rodowod.om.nazwa"
            v-model="horse.rodowod.om.nazwa"
          />
          <span class="form-error" v-if="errors['horse.rodowod.om.nazwa']">{{
            errors["horse.rodowod.om.nazwa"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="horse.rodowod.om.kraj">Kraj</label>
          <select
            class="form-country"
            v-if="countries"
            id="horse.rodowod.om.kraj"
            v-model="horse.rodowod.om.kraj"
            name=""
          >
            <option
              :key="country.code"
              v-for="country in countries"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
          <span class="form-error" v-if="errors['horse.rodowod.om.kraj']">{{
            errors["horse.rodowod.om.kraj"]
          }}</span>
        </div>
      </div>
    </div>
    <a class="btn-add" @click="checkForm">Edytuj</a>
  </div>
</template>

<script>
import countriesList from "../../assets/countries.json";

export default {
  data() {
    return {
      countries: countriesList,
      errors: [],
      classes: {},
      horse: {}
    };
  },
  mounted() {
    this.classes = this.$store.state.classes;
    this.horseId = this.$router.currentRoute.params.horseId;
    this.horse = this.$store.getters.fetchHorseById(this.horseId);
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];

      if (
        this.horse.numer &&
        this.horse.nazwa &&
        this.horse.kraj &&
        this.horse.klasa &&
        this.horse.rocznik &&
        this.horse.plec &&
        this.horse.masc &&
        this.horse.wlasciciel.nazwa &&
        this.horse.wlasciciel.kraj &&
        this.horse.hodowca.nazwa &&
        this.horse.hodowca.kraj &&
        this.horse.rodowod.om.nazwa &&
        this.horse.rodowod.om.kraj &&
        this.horse.rodowod.o.nazwa &&
        this.horse.rodowod.o.kraj &&
        this.horse.rodowod.m.nazwa &&
        this.horse.rodowod.m.kraj
      ) {
        this.postHorse();
        return true;
      }

      if (!this.horse.nazwa) {
        this.errors["horse.numer"] = "Numer wymagany.";
      }
      if (!this.horse.nazwa) {
        this.errors["horse.nazwa"] = "Nazwa wymagana.";
      }
      if (!this.horse.kraj) {
        this.errors["horse.kraj"] = "Kraj wymagany.";
      }
      if (!this.horse.klasa) {
        this.errors["horse.klasa"] = "Klasa wymagana.";
      }
      if (!this.horse.rocznik) {
        this.errors["horse.rocznik"] = "Rocznik wymagany.";
      }
      if (!this.horse.plec) {
        this.errors["horse.plec"] = "Płeć wymagana.";
      }
      if (!this.horse.masc) {
        this.errors["horse.masc"] = "Maść wymagana.";
      }
      if (!this.horse.wlasciciel.nazwa) {
        this.errors["horse.wlasciciel.nazwa"] = "Nazwa wymagana.";
      }
      if (!this.horse.wlasciciel.kraj) {
        this.errors["horse.wlasciciel.kraj"] = "Kraj wymagany.";
      }
      if (!this.horse.hodowca.nazwa) {
        this.errors["horse.hodowca.nazwa"] = "Nazwa wymagana.";
      }
      if (!this.horse.hodowca.kraj) {
        this.errors["horse.hodowca.kraj"] = "Kraj wymagany.";
      }
      if (!this.horse.rodowod.om.nazwa) {
        this.errors["horse.rodowod.om.nazwa"] = "Nazwa wymagana.";
      }
      if (!this.horse.rodowod.om.kraj) {
        this.errors["horse.rodowod.om.kraj"] = "Kraj wymagany.";
      }
      if (!this.horse.rodowod.o.nazwa) {
        this.errors["horse.rodowod.o.nazwa"] = "Nazwa wymagana.";
      }
      if (!this.horse.rodowod.o.kraj) {
        this.errors["horse.rodowod.o.kraj"] = "Kraj wymagany.";
      }
      if (!this.horse.rodowod.m.nazwa) {
        this.errors["horse.rodowod.m.nazwa"] = "Nazwa wymagana.";
      }
      if (!this.horse.rodowod.m.kraj) {
        this.errors["horse.rodowod.m.kraj"] = "Kraj wymagany.";
      }

      e.preventDefault();
    },
    postHorse: function() {
      localStorage.setItem("class", this.horse.klasa);

      this.$store.dispatch("editHorse", this.horse).then(() => {
        this.$socket.emit("klasa");
        this.$socket.emit("ranking", this.horse.klasa);
        this.$store.dispatch("fetchAllHorses").then(() => {
          this.$router.push({
            name: "horses"
          });
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

  .form {
    display: flex !important;

    .form-col {
      width: 25vw;

      h4 {
        margin-top: 30px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
