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
      path: "/horses/create",
      name: "horses.create",
      component: () => import("./components/horses/Create.vue")
    },
    {
      path: "/horses/:horseId/edit",
      name: "horses.edit",
      component: () => import("./components/horses/Edit.vue")
    },
    {
      path: "/horses/:horseId/rate",
      name: "horses.rate",
      component: () => import("./components/horses/Rate.vue")
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
    {
      path: "/judges/create",
      name: "judges.create",
      component: () => import("./components/judges/Create.vue")
    },
    {
      path: "/judges/:judgeId/edit",
      name: "judges.edit",
      component: () => import("./components/judges/Edit.vue")
    },
    //  Classes
    {
      path: "/classes",
      name: "classes",
      component: () => import("./views/classes/Index.vue")
    },
    {
      path: "/classes/create",
      name: "classes.create",
      component: () => import("./components/classes/Create.vue")
    },
    {
      path: "/classes/:classId/edit",
      name: "classes.edit",
      component: () => import("./components/classes/Edit.vue")
    }
  ]
});
