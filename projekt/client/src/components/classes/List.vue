<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Numer</th>
          <th>Kategoria</th>
          <th>Czempionat</th>
          <th>Komisja</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horseClass in classes" :key="horseClass._id">
          <td class="td-action">{{ horseClass.numer }}</td>
          <td>{{ horseClass.kat }}</td>
          <td>{{ horseClass.czempionat }}</td>
          <td>
            <span v-for="sedzia in horseClass.komisja" :key="sedzia">
              {{ getJudge(sedzia).sedzia }} ({{ getJudge(sedzia).kraj }})<br />
            </span>
          </td>
          <td class="td-action">
            <router-link
              class="btn-edit"
              :to="{
                name: 'classes.edit',
                params: { classId: horseClass._id }
              }"
              >Edytuj</router-link
            >
            <a
              class="btn-remove"
              v-if="!classHasHorses(horseClass.numer)"
              @click="removeClass(horseClass._id)"
              >Usuń</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn-add" to="classes/create"
      >Dodaj nową klasę</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    classes: {}
  },
  methods: {
    getJudge: function(id) {
      return this.$store.getters.fetchJudgeById(id);
    },
    removeClass: function(id) {
      this.$store.dispatch("removeClass", id).then(() => {
        localStorage.setItem("class", this.$store.state.classes[0].numer);
        this.$store.dispatch("fetchAllClasses").then(() => {
          this.$router.push({
            name: "classes"
          });
        });
      });
    },
    classHasHorses: function(cl) {
      return this.$store.getters.classHasHorses(cl);
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
}
table {
  border-collapse: collapse;
  margin-top: 20px;
  width: 100%;

  th {
    background: grey;
    color: #fff;
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
