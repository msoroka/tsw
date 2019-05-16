<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Number</th>
          <th>Catergory</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horseClass in classes" :key="horseClass.id">
          <td>{{ horseClass.id }}</td>
          <td>{{ horseClass.numer }}</td>
          <td>{{ horseClass.kat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    classes: {}
  }
};
</script>

<style scoped></style>
