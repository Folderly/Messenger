<template>
  <router-view />

  <LoadingPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingPage from "./components/common/LoadingPage.vue";

export default defineComponent({
  components: {
    LoadingPage,
  },
});
</script>

<style lang="scss"></style>
