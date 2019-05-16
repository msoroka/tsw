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
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.id }}</td>
          <td>{{ horse.nazwa }}</td>
          <td>{{ horse.kraj }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    horses: {}
  }
};
</script>

<style scoped></style>
