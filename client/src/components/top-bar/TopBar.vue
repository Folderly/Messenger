<template>
  <div class="top-bar top-0 left-0 fixed w-full h-16">
    <div
      class="-intro-y top-bar__content bg-white border-theme-3 dark:bg-dark-2 dark:border-dark-2 border-b w-full h-full flex px-5"
    >
      <div class="hidden md:flex items-center h-full mr-auto">
        <div class="text-base font-light ml-4">
          <span class="font-medium">Folderly</span> Messenger
        </div>
      </div>

      <div class="account-dropdown dropdown relative">
        <div class="h-full dropdown-toggle flex items-center pl-5">
          <div class="hidden md:block ml-3">
            <div class="font-medium leading-tight">{{ currentUser.email }}</div>
          </div>
        </div>
      </div>

      <div class="hidden md:flex items-center px-5">
        <div class="btn btn-primary" @click="signOut">Sign out</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TopBar",

  setup() {
    const router = useRouter();
    const store = useStore();

    const currentUser = computed(() => store.currentUser);

    async function signOut() {
      store.$patch({ loading: true });

      try {
        await store.signOut();

        router.push("sign-in");
      } catch (error) {
        console.error(error);
      } finally {
        store.$patch({ loading: false });
      }
    }

    return {
      currentUser,

      signOut,
    };
  },
});
</script>
