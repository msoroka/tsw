<template>
  <div class="container">
    <h1>Edytuj sędziego</h1>
    <div class="form">
      <div class="form-group">
        <label for="sedzia">Imię i nazwisko</label>
        <input type="text" id="sedzia" v-model="judge.sedzia" />
        <span class="form-error" v-if="errors['judge.sedzia']">{{
          errors["judge.sedzia"]
        }}</span>
      </div>
      <div class="form-group">
        <label for="kraj">Kraj</label>
        <select
          class="form-country"
          v-if="countries"
          id="kraj"
          v-model="judge.kraj"
          name=""
        >
          <option
            :key="country.code"
            v-for="country in countries"
            v-bind:value="country.code"
            >{{ country.name }}</option
          >
        </select>
        <span class="form-error" v-if="errors['judge.kraj']">{{
          errors["judge.kraj"]
        }}</span>
      </div>
    </div>
    <a class="btn-add" @click="checkForm">Edytuj</a>
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
      judge: {}
    };
  },
  mounted() {
    this.judgeId = this.$router.currentRoute.params.judgeId;
    this.judge = this.$store.getters.fetchJudgeById(this.judgeId);
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];

      if (this.judge.sedzia && this.judge.kraj) {
        this.postJudge();
        return true;
      }

      if (!this.judge.sedzia) {
        this.errors["judge.sedzia"] = "Imię i nazwisko wymagane.";
      }
      if (!this.judge.kraj) {
        this.errors["judge.kraj"] = "Kraj wymagany";
      }

      e.preventDefault();
    },
    postJudge: function() {
      const self = this;

      axios
        .put("http://localhost:4000/sedziowie/" + this.judge._id, this.judge)
        .then(function() {
          self.$store.dispatch("fetchAllJudges");
          self.$router.push({
            name: "judges"
          });
        });
    }
  }
};
</script>

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
</style>
