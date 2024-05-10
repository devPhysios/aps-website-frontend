import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import axios from "axios";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Gallery from "../views/Gallery.vue";
import Alumni from "../views/Alumni.vue";
import Upload from "../views/Upload.vue";
import Dashboard from "../views/Dashboard.vue";
import UpdateSecurity from "../views/Updatesecurity.vue";
import Login from "../views/Login.vue";
import Uploadquestion from "@/views/Uploadquestion.vue";
import NotFound from "@/views/Notfound.vue";
// import ViewQuestion from "@/views/Viewquestion.vue";
import Profile from "@/views/Profile.vue";
import Constitution from "@/views/Const.vue";
import Questions from "@/views/Questions.vue";
import LevelQuestions from "@/views/Levelquestions.vue";
import CourseQuestions from "@/views/Coursequestions.vue";
import Payment from "@/views/Payment.vue";
import InternalServerError from "@/views/Internalservererror.vue";
import YellowBook from "@/views/Yellowbook.vue";
import LevelYellowBook from "@/views/Levelyellowbook.vue";
import CourseYellowBook from "@/views/Courseyellowbook.vue";
import PhysioPress from "@/views/Physiopress.vue";
import PhysioRay from "@/views/Physioray.vue";
// import TestingGround from "@/views/Testingground.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  // {
  //   path: "/testingground",
  //   name: "TestingGround",
  //   component: TestingGround
  // },
  {
    path: "/about",
    name: "AboutPage",
    component: About,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/gallery",
    name: "GalleryPage",
    component: Gallery,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/alumni",
    name: "AlumniPage",
    component: Alumni,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard/questions/:level",
    name: "LevelQuestions",
    component: LevelQuestions,
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard/questions/:level/:course",
    name: "CourseQuestions",
    component: CourseQuestions,
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard/yellowbook/:level",
    name: "LevelYellowBook",
    component: LevelYellowBook,
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard/yellowbook/:level/:course",
    name: "CourseYellowBook",
    component: CourseYellowBook,
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard/yellowbook",
    name: "YellowBook",
    component: YellowBook,
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/upload",
    name: "UploadPage",
    component: Upload,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/constitution",
    name: "ConstitutionPage",
    component: Constitution,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard/questions",
    name: "QuestionsPage",
    component: Questions,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
  {
    path: "/auth/updatesecurity",
    name: "UpdateSecurityPage",
    component: UpdateSecurity,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
  {
    path: "/auth/login",
    name: "LoginPage",
    component: Login,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
  {
    path: "/dashboard/uploadquestion",
    name: "UploadQuestionPage",
    component: Uploadquestion,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    }
  },
  {
    path: "/physiopress",
    name: "PhysioPress",
    component: PhysioPress,
  },
  {
    path: "/physioray",
    name: "PhysioRay",
    component: PhysioRay,
  },

  // {
  //   path: "/admin/questions/",
  //   name: "ViewQuestionPage",
  //   component: ViewQuestion,
  // },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
  {
    path: "/500",
    name: "InternalServerError",
    component: InternalServerError,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useUserStore();
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
    } else {
      next();
    }
  } else {
    next();
  }
});

// const fetchData = async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:8800/questions/${id}`);
//     return response.data;
//   } catch (error) {
//     router.next({ name: "NotFound" });
//   }
// };

export default router;
