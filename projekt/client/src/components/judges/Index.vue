<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Country</th>
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

<style scoped></style>
