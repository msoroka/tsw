<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Kraj</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="judge in judges" :key="judge.id">
          <td>{{ judge.sedzia }}</td>
          <td>{{ judge.kraj }}</td>
          <td class="td-action">
            <router-link
              class="btn-edit"
              :to="{ name: 'judges.edit', params: { judgeId: judge._id } }"
              >Edytuj</router-link
            >
            <a
              v-if="!judgeHasClass(judge._id)"
              class="btn-remove"
              @click="removeJudge(judge._id)"
              >Usuń</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn-add" to="judges/create"
      >Dodaj nowego sędziego</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    judges: {}
  },
  mounted() {
    this.$store.dispatch("fetchAllJudges");
  },
  methods: {
    removeJudge: function(id) {
      this.$store.dispatch("removeJudge", id).then(() => {
        this.$store.dispatch("fetchAllJudges").then(() => {
          this.$router.push({
            name: "judges"
          });
        });
      });
    },
    judgeHasClass: function(id) {
      return this.$store.getters.judgeHasClass(id);
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
