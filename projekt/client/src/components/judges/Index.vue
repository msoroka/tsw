<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa</th>
          <th>Kraj</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="judge in judges" :key="judge.id">
          <td>{{ judge.id }}</td>
          <td>{{ judge.sedzia }}</td>
          <td>{{ judge.kraj }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    judges: {}
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
