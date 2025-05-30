import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import axios from "axios";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Gallery from "../views/Gallery.vue";
import CGPACalculator from "@/views/CgpaCalculator.vue";
import Alumni from "../views/Alumni.vue";
import Upload from "../views/Upload.vue";
import Dashboard from "../views/Dashboard.vue";
import UpdateSecurity from "../views/Updatesecurity.vue";
import Login from "../views/Login.vue";
import Uploadquestion from "@/views/Uploadquestion.vue";
import NotFound from "@/views/Notfound.vue";
import BirthdayUpload from "@/views/Uploadbirthdays.vue";
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
import TestingGround from "@/views/Testingground.vue";
import Privacypolicy from "@/views/Privacypolicy.vue";
import Termsofservice from "../views/Termsofservice.vue";
import Birthdayevent from "@/views/Birthdayevent.vue";
import Birthdayeventmanager from "@/views/Birthdayeventsmanager.vue";
import Leaders from "@/views/Leaders.vue";
import ProjectTopics from "@/views/ProjectTopics.vue";
import StudentProjectTopics from "@/views/StudentProjectTopics.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    component: Privacypolicy,
  },
  {
    path: "/terms-of-service",
    name: "Tos",
    component: Termsofservice,
  },
  {
    path: "/testingground",
    name: "TestingGround",
    component: TestingGround,
  },
  {
    path: "/birthdays",
    name: "BirthdayEvent",
    component: Birthdayevent,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      store.updateHeaderVisibility(false);
      next();
    },
  },
  {
    path: "/leaders",
    name: "LeadersPage",
    component: Leaders,
  },
  {
    path: "/dashboard/birthday-manager",
    name: "BirthdayEventManager",
    component: Birthdayeventmanager,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      store.updateHeaderVisibility(true);
      next();
    },
  },
  {
    path: "/about",
    name: "AboutPage",
    component: About,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
  },
  {
    path: "/gallery",
    name: "GalleryPage",
    component: Gallery,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
  },
  {
    path: "/alumni",
    name: "AlumniPage",
    component: Alumni,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
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
    },
  },
  {
    path: "/dashboard/questions/:level/:course",
    name: "CourseQuestions",
    component: CourseQuestions,
    props: false,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
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
    },
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
    },
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
    },
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
    },
  },
  {
    path: "/dashboard/birthdayupload",
    name: "BirthdayUploadPage",
    component: BirthdayUpload,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
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
    },
  },
  {
    path: "/dashboard/cgpacalculator",
    name: "CGPA Calculator",
    component: CGPACalculator,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
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
    },
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
    },
  },
  {
    path: "/auth/updatesecurity",
    name: "UpdateSecurityPage",
    component: UpdateSecurity,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
  },
  {
    path: "/auth/login",
    name: "LoginPage",
    component: Login,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
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
    },
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
  {
    path: "/project-topics",
    name: "ProjectTopics",
    component: ProjectTopics,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
  },
  {
    path: "/500",
    name: "InternalServerError",
    component: InternalServerError,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
  },
  {
    path: "/dashboard/my-project-topic",
    name: "StudentProjectTopics",
    component: StudentProjectTopics,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(true);
      next();
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      store.updateFooterVisibility(false);
      next();
    },
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
    } else if (!store.user.hasOwnProperty("forceLogout")) {
      store.logout();
      next({
        name: "LoginPage",
        query: { redirect: to.fullPath },
      });
    } else if (store.user.forceLogout) {
      store.logout();
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

export default router;
