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
import ViewQuestion from "@/views/Viewquestion.vue";
import Profile from "@/views/Profile.vue";
import Constitution from "@/views/Const.vue";
import Questions from "@/views/Questions.vue";
import PQ100L from "@/views/PQ100L.vue";
import PQ200L from "@/views/PQ200L.vue";
import PQ300L from "@/views/PQ300L.vue";
import PQ400L from "@/views/PQ400L.vue";
import PQ500L from "@/views/PQ500L.vue";
import CourseQuestions from "@/views/Coursequestions.vue";
import Payment from "@/views/Payment.vue";

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
    path: "/dashboard/questions/100",
    name: "PQ100LPage",
    component: PQ100L,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/questions/200",
    name: "PQ200LPage",
    component: PQ200L,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/questions/300",
    name: "PQ300LPage",
    component: PQ300L,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/questions/400",
    name: "PQ400LPage",
    component: PQ400L,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/questions/500",
    name: "PQ500LPage",
    component: PQ500L,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/questions/:level/:course",
    name: 'CourseQuestions',
    component: CourseQuestions,
    props: true
  },
  {
    path: "/upload",
    name: "UploadPage",
    component: Upload,
  },
  {
    path: "/constitution",
    name: "ConstitutionPage",
    component: Constitution,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/questions",
    name: "QuestionsPage",
    component: Questions,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/questions/",
    name: "ViewQuestionPage",
    component: ViewQuestion,
    // props: true,
    // beforeEnter: async (to, from, next) => {
    //   try {
    //     // Fetch data from the server
    //     await fetchData(to.params.id);
    //     next();
    //   } catch (error) {
    //     next({ name: "NotFound" });
    //   }
    // },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
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

const fetchData = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8800/questions/${id}`);
    return response.data;
  } catch (error) {
    router.next({ name: "NotFound" });
  }
};

export default router;
