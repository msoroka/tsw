<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Numer</th>
          <th>Kategoria</th>
          <th>Czempionat</th>
          <th>Komisja</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horseClass in classes" :key="horseClass.id">
          <td>{{ horseClass._id }}</td>
          <td>{{ horseClass.numer }}</td>
          <td>{{ horseClass.kat }}</td>
          <td>{{ horseClass.czempionat }}</td>
          <td>
            <span v-for="sedzia in horseClass.komisja" :key="sedzia">
              {{ getJudge(sedzia).sedzia }} ({{ getJudge(sedzia).kraj }})<br />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
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
