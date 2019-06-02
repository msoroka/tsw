import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";

Vue.use(Router);

let router = new Router({
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
      component: () => import("./views/horses/Index.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horses/create",
      name: "horses.create",
      component: () => import("./components/horses/Create.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horses/:horseId/edit",
      name: "horses.edit",
      component: () => import("./components/horses/Edit.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horses/:horseId/rate",
      name: "horses.rate",
      component: () => import("./components/horses/Rate.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horses/:horseId",
      name: "horse",
      component: () => import("./components/horses/View.vue"),
      meta: {
        requiresAuth: true
      }
    },
    //  Judges
    {
      path: "/judges",
      name: "judges",
      component: () => import("./views/judges/Index.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/judges/create",
      name: "judges.create",
      component: () => import("./components/judges/Create.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/judges/:judgeId/edit",
      name: "judges.edit",
      component: () => import("./components/judges/Edit.vue"),
      meta: {
        requiresAuth: true
      }
    },
    //  Classes
    {
      path: "/classes",
      name: "classes",
      component: () => import("./views/classes/Index.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/classes/create",
      name: "classes.create",
      component: () => import("./components/classes/Create.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/classes/:classId/edit",
      name: "classes.edit",
      component: () => import("./components/classes/Edit.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    alert("Nieautoryzowana akcja");
  } else {
    next();
  }
});

export default router;
