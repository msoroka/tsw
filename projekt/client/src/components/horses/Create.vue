<template>
  <div class="container">
    <h1>Dodaj konia</h1>
    <div class="form">
      <div class="form-col">
        <h3>Dane konia</h3>
        <div class="form-group">
          <label for="horse.numer">Numer</label>
          <input
            type="number"
            min="1"
            max="9999"
            step="1"
            id="horse.numer"
            v-model="horse.numer"
          />
          <span class="form-error" v-if="errors['horse.numer']">{{
            errors["horse.numer"]
          }}</span>
        </div>
        <div class="form-group">
          <label for="nazwa">Nazwa</label>
          <input type="text" id="nazwa" v-model="horse.nazwa" />
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
          <label for="nazwa">Płeć</label>
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
          <label for="nazwa">Maść</label>
          <input type="text" id="masc" v-model="horse.masc" />
          <span class="form-error" v-if="errors['horse.masc']">{{
            errors["horse.masc"]
          }}</span>
        </div>
      </div>
      <div class="form-col">
        <h3>Właściciel i hodowca</h3>
        <h4>Właściciel</h4>
        <div class="form-group">
          <label for="nazwa">Nazwa</label>
          <input
            type="text"
            id="wlasciciel.nazwa"
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
          <label for="nazwa">Nazwa</label>
          <input type="text" id="hodowca.nazwa" v-model="horse.hodowca.nazwa" />
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
          <label for="nazwa">Nazwa</label>
          <input
            type="text"
            id="rodowod.o.nazwa"
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
          <label for="nazwa">Nazwa</label>
          <input
            type="text"
            id="rodowod.m.nazwa"
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
          <label for="nazwa">Nazwa</label>
          <input
            type="text"
            id="rodowod.om.nazwa"
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
    <a class="btn-add" @click="checkForm">Dodaj</a>
  </div>
</template>

<script>
import countriesList from "../../assets/countries.json";
import axios from "axios";

export default {
  data() {
    return {
      countries: countriesList,
      errors: [],
      classes: {},
      horse: {
        numer: 1,
        klasa: "",
        nazwa: "",
        kraj: "",
        rocznik: 2019,
        masc: "",
        plec: "",
        hodowca: {
          nazwa: "",
          kraj: ""
        },
        wlasciciel: {
          nazwa: "",
          kraj: ""
        },
        rodowod: {
          o: {
            nazwa: "",
            kraj: ""
          },
          m: {
            nazwa: "",
            kraj: ""
          },
          om: {
            nazwa: "",
            kraj: ""
          }
        }
      }
    };
  },
  mounted() {
    this.classes = this.$store.state.classes;
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

      if (!this.horse.numer) {
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
      const horse = {
        numer: this.horse.numer,
        klasa: this.horse.klasa,
        nazwa: this.horse.nazwa,
        kraj: this.horse.kraj,
        rocznik: this.horse.rocznik,
        masc: this.horse.masc,
        plec: this.horse.plec,
        hodowca: {
          nazwa: this.horse.hodowca.nazwa,
          kraj: this.horse.hodowca.kraj
        },
        wlasciciel: {
          nazwa: this.horse.wlasciciel.nazwa,
          kraj: this.horse.wlasciciel.kraj
        },
        rodowod: {
          o: {
            nazwa: this.horse.rodowod.o.nazwa,
            kraj: this.horse.rodowod.o.kraj
          },
          m: {
            nazwa: this.horse.rodowod.m.nazwa,
            kraj: this.horse.rodowod.m.kraj
          },
          om: {
            nazwa: this.horse.rodowod.om.nazwa,
            kraj: this.horse.rodowod.om.kraj
          }
        }
      };

      localStorage.setItem("class", this.horse.klasa);

      this.$store.dispatch("addHorse", horse).then(() => {
        this.$socket.emit("ranking", horse.klasa);
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
