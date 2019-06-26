import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import VModal from "vue-js-modal";
import VueSocketIO from "vue-socket.io";
import router from "./router";

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: "http://" + window.location.hostname + ":4000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
