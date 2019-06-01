import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    //  Ranking
    {
      path: "/",
      name: "ranking",
      component: () => import("./views/rankings/Index.vue")
    },
    //  Horses
    {
      path: "/horses",
      name: "horses",
      component: () => import("./views/horses/Index.vue")
    },
    {
      path: "/horses/:horseId",
      name: "horse",
      component: () => import("./components/horses/View.vue")
    },
    //  Judges
    {
      path: "/judges",
      name: "judges",
      component: () => import("./views/judges/Index.vue")
    },
    //  Classes
    {
      path: "/classes",
      name: "classes",
      component: () => import("./views/classes/Index.vue")
    }
  ]
});
