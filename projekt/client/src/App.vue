<template>
  <div id="app">
    <Navbar />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch("fetchAllHorses");
    this.$store.dispatch("fetchAllClasses");
    this.$store.dispatch("fetchAllJudges");
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.form {
  margin: 0 auto;
  border: 1px solid lightgrey;
  padding: 20px 40px;

  .form-group {
    width: 20vw;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    flex-direction: column;

    label {
      font-size: inherit;
    }

    input {
      font-size: inherit;
      font-family: inherit;
    }

    .form-error {
      color: lightcoral;
      font-size: 12px;
    }

    .form-country {
      font-size: inherit;
      font-family: inherit;
      padding: 1px;
      background: #fff;
      border-radius: 0;
      border-color: #cccccc;
      -webkit-appearance: none;
    }
  }
}

.td-action {
  width: 1%;
}

.btn-add {
  text-decoration: none;
  margin: 30px auto;
  text-align: center;
  background: #868686;
  width: 200px;
  padding: 10px 20px;
  color: #fff;
  font-weight: 700;
  &:hover {
    background: darken(lightgrey, 10%);
    cursor: pointer;
  }
}

.btn-edit {
  text-decoration: none;
  background: dodgerblue;
  color: #fff;
  font-weight: 700;
  padding: 3px 5px;
  margin-right: 5px;
  &:hover {
    background: darken(dodgerblue, 10%);
    cursor: pointer;
  }
}

.btn-remove {
  text-decoration: none;
  background: orangered;
  color: #fff;
  font-weight: 700;
  padding: 3px 5px;
  margin: 0 5px;
  &:hover {
    background: darken(orangered, 10%);
    cursor: pointer;
  }
}
</style>
