<template>
  <div>
    <div id="nav">
      <router-link to="/">Ranking</router-link> |
      <router-link to="/horses">Horses</router-link> |
      <router-link to="/judges">Judges</router-link> |
      <router-link to="/classes">Classes</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped></style>
