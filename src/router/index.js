import Vue from "vue";
import VueRouter from "vue-router";
import AuthorizationPage from "../views/AuthorizationPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: AuthorizationPage,
  },
  {
    path: "/list",
    name: "list",
    // component: HomeView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ListPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
