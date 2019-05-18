<template>
  <div>
    <div id="nav">
      <div class="logo">
        <p>Horses App</p>
      </div>
      <div class="links">
        <router-link to="/">Ranking</router-link>
        <router-link to="/horses">Horses</router-link>
        <router-link to="/judges">Judges</router-link>
        <router-link to="/classes">Classes</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="less">
div {
  #nav {
    display: flex;
    background: lightgrey;
    justify-content: space-between;
    font-weight: 700;

    .logo {
      padding: 10px 20px;

      p {
        margin: 0;
      }
    }

    div.links {
      display: flex;
      flex-direction: row;
      margin: 0;

      a {
        text-decoration: none;
        padding: 10px 20px;
        color: #000;

        &:hover {
          background: darken(lightgrey, 10%);
        }
      }

      a.router-link-exact-active.router-link-active {
        color: #fff;
        background: darken(lightgrey, 30%);
      }
    }
  }
}
</style>
