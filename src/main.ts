import { App, createApp, createSSRApp, defineComponent } from "vue";
import VueApp from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(VueApp).use(createPinia()).use(router).mount("#app");
