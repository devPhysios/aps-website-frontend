import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Gallery from "../views/Gallery.vue";
import Alumni from "../views/Alumni.vue";
import Upload from "../views/Upload.vue";
import Dashboard from "../views/Dashboard.vue";
import UpdateSecurity from "../views/Updatesecurity.vue";
import Login from "../views/Login.vue";
import Uploadquestion from "@/views/Uploadquestion.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },

  {
    path: "/about",
    name: "AboutPage",
    component: About,
  },

  {
    path: "/gallery",
    name: "GalleryPage",
    component: Gallery,
  },

  {
    path: "/alumni",
    name: "AlumniPage",
    component: Alumni,
  },
  {
    path: "/upload",
    name: "UploadPage",
    component: Upload,
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/auth/updatesecurity",
    name: "UpdateSecurityPage",
    component: UpdateSecurity,
  },
  {
    path: "/auth/login",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/dashboard/uploadquestion",
    name: "UploadQuestionPage",
    component: Uploadquestion,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async(to, from, next) => {
  const store = await useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "LoginPage",
        query: { redirect: to.fullPath },
      });
    } else if (store.user && store.user.firstLogin) {
      next({
        name: "UpdateSecurityPage",
        query: { redirect: to.fullPath },
      });
    }
    else {
      next();
    }
  } else {
    next();
  }
});


export default router;
