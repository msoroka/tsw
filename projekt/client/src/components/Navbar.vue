<template>
  <div>
    <div id="nav">
      <div class="logo">
        <p>PokazyKoni</p>
      </div>
      <div class="links">
        <router-link to="/">Ranking</router-link>
        <router-link to="/horses">Konie</router-link>
        <router-link to="/judges">Sędziowie</router-link>
        <router-link to="/classes">Klasy</router-link>
        <a v-if="!isLoggedIn" @click="showLoginForm">Zaloguj</a>
        <a v-if="isLoggedIn" @click="logout">Wyloguj</a>
      </div>
    </div>
    <modal name="login-form">
      <div class="login-wrap">
        <div>
          <label for="login">Login</label>
          <input type="text" id="login" v-model="login" />
        </div>
        <div>
          <label for="password">Hasło</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button @click="tryToLogin">Zaloguj</button>
        <span class="wrong-creds" v-if="wrongCreds"
          >Nieprawidłowe dane logowania</span
        >
      </div>
    </modal>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {
      login: "",
      password: "",
      wrongCreds: false
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    showLoginForm: function() {
      this.$modal.show("login-form");
    },
    tryToLogin: function() {
      let login = this.login;
      let password = this.password;
      this.$store
        .dispatch("login", { login, password })
        .then(() => {
          this.$router.push("/horses");
          this.wrongCreds = false;
          this.login = "";
          this.password = "";
          this.$modal.hide("login-form");
        })
        .catch(() => {
          this.wrongCreds = true;
        });
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  height: 100%;

  .wrong-creds {
    margin: 10px 0;
    color: orangered;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    input {
      font-size: inherit;
      font-family: inherit;
    }
  }

  button {
    font-size: inherit;
    font-family: inherit;
    font-weight: 700;
    padding: 3px 20px;
    background: lightgrey;
    border: 1px solid lightgrey;
  }
}
div {
  #nav {
    display: flex;
    background: lightgrey;
    justify-content: space-between;
    font-weight: 700;

    .logo {
      padding: 10px 20px;
      color: #000;

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
          cursor: pointer;
        }
      }
    }
  }
}
</style>
