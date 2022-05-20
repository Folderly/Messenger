import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignIn from "../components/SignIn.vue";
import Chat from "../components/Main.vue";
import { useStore } from "@/store";

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

// router.beforeEach((to, from) => {
//   console.log("Router");
//   const store = useStore();

//   const isLogged = !!store.currentUser;
//   if (!isLogged && to.name !== "SignIn") return "/sign-in";
// });

export default router;
