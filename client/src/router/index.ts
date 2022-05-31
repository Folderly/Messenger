import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignIn from "../components/SignIn.vue";
import Chat from "../components/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/",
    name: "Chat",
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
