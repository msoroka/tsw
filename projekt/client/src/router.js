import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ranking",
      component: () => import("./views/rankings/Rankings.vue")
    },
    {
      path: "/horses",
      name: "horses",
      component: () => import("./views/horses/Horses.vue")
    },
    {
      path: "/judges",
      name: "judges",
      component: () => import("./views/judges/Judges.vue")
    },
    {
      path: "/classes",
      name: "classes",
      component: () => import("./views/classes/Classes.vue")
    }
  ]
});
