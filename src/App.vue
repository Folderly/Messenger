<template>
  <router-view />

  <LoadingPage />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "./store";
import LoadingPage from "./components/common/LoadingPage.vue";

export default defineComponent({
  components: {
    LoadingPage,
  },

  setup() {
    const store = useStore();

    onMounted(async () => {
      store.$patch({ loading: true });
      try {
        await Promise.all([store.fetchCurrentUser(), store.fetchContacts()]);
      } catch (error) {
        console.error(error);
      } finally {
        store.$patch({ loading: false });
      }
    });
  },
});
</script>

<style lang="scss"></style>
