<template>
  <div>
    <div id="nav">
      <div class="logo">
        <p>PokazyKoni</p>
      </div>
      <div class="links">
        <router-link to="/">Ranking</router-link>
        <router-link v-if="isLoggedIn" to="/horses">Konie</router-link>
        <router-link v-if="isLoggedIn" to="/judges">Sędziowie</router-link>
        <router-link v-if="isLoggedIn" to="/classes">Klasy</router-link>
        <router-link v-if="isLoggedIn" to="/management">Import</router-link>
        <a v-if="!isLoggedIn" @click="showLoginForm">Zaloguj</a>
        <a v-if="isLoggedIn" @click="logout">Wyloguj</a>
      </div>
    </div>
    <modal name="login-form" :width="400">
      <div class="login-wrap">
        <div>
          <label for="username">Login</label>
          <input type="text" id="username" v-model="username" />
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
    <Message />
    <router-view />
  </div>
</template>

<script>
import Message from "@/components/Message";

export default {
  name: "Navbar",
  data: function() {
    return {
      username: "",
      password: "",
      wrongCreds: false
    };
  },
  components: {
    Message
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.state.loggedIn;
    }
  },
  methods: {
    showLoginForm: function() {
      this.$modal.show("login-form");
    },
    tryToLogin: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => {
          this.$router.go();
          this.wrongCreds = false;
          this.username = "";
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
