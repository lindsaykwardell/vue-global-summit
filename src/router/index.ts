import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      const loggedIn = sessionStorage.getItem("js-marathon");
      if (!loggedIn) {
        next({ path: "/login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter(to, from, next) {
      const loggedIn = sessionStorage.getItem("js-marathon");
      if (!loggedIn) {
        next({ path: "/login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      const loggedIn = sessionStorage.getItem("js-marathon");
      if (loggedIn) {
        next({ path: "/" });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
