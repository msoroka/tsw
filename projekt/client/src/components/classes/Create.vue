<template>
  <div class="container">
    <h1>Dodaj klasę</h1>
    <div class="form">
      <div class="form-group">
        <label for="numer">Numer</label>
        <input
          type="number"
          min="1"
          max="99"
          step="1"
          id="numer"
          v-model="cl.numer"
        />
        <span class="form-error" v-if="errors['cl.numer']">{{
          errors["cl.numer"]
        }}</span>
      </div>
      <div class="form-group">
        <label for="kat">Kategoria</label>
        <input type="text" id="kat" v-model="cl.kat" />
        <span class="form-error" v-if="errors['cl.kat']">{{
          errors["cl.kat"]
        }}</span>
      </div>
      <div class="form-group">
        <label for="czempionat">Czempionat</label>
        <input
          type="number"
          min="1"
          max="99"
          step="1"
          id="czempionat"
          v-model="cl.czempionat"
        />
        <span class="form-error" v-if="errors['cl.czempionat']">{{
          errors["cl.czempionat"]
        }}</span>
      </div>
      <div class="form-group">
        <label>Komisja</label>
        <multiselect
          v-model="selectedKomisja"
          placeholder="Wyszukaj sędziów"
          label="sedzia"
          track-by="_id"
          :options="options"
          :multiple="true"
        ></multiselect>
        <span class="form-error" v-if="errors['cl.komisja']">{{
          errors["cl.komisja"]
        }}</span>
      </div>
    </div>
    <a class="btn-add" @click="checkForm">Dodaj</a>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      errors: [],
      cl: {
        numer: 1,
        kat: "",
        czempionat: 1,
        komisja: []
      },
      selectedKomisja: [],
      options: [],
      classes: {}
    };
  },
  mounted() {
    this.options = this.$store.state.judges;
    this.classes = this.$store.state.classes;
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();
      this.errors = [];

      this.selectedKomisja.forEach(val => {
        this.cl.komisja.push(val._id);
      });

      if (!this.cl.numer) {
        this.errors["cl.numer"] = "Numer wymagany.";
      }
      if (!this.cl.kat) {
        this.errors["cl.kat"] = "Kategoria wymagana";
      }
      if (!this.cl.czempionat) {
        this.errors["cl.czempionat"] = "Czempionat wymagany";
      }
      if (this.cl.komisja.length === 0) {
        this.errors["cl.komisja"] = "Komisja wymagana";
      }

      if (
        this.errors.length === 0 &&
        this.cl.numer &&
        this.cl.kat &&
        this.cl.czempionat &&
        this.cl.komisja.length
      ) {
        this.postClass();
        return true;
      }
    },
    postClass: function() {
      const cl = {
        numer: this.cl.numer,
        kat: this.cl.kat,
        czempionat: this.cl.czempionat,
        komisja: this.cl.komisja
      };

      this.$store.dispatch("addClass", cl).then(() => {
        this.$store.dispatch("fetchAllHorses").then(() => {
          this.$store.dispatch("fetchAllClasses").then(() => {
            this.$socket.emit("klasa");
            this.$router.push({
              name: "classes"
            });
          });
        });
      });
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="less">
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
  }
}

.multiselect__tags {
  border-radius: 0;
  border-color: #cccccc;

  .multiselect__tag {
    background: lightgrey;
    color: #000;
  }
}
</style>
