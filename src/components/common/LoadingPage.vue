<template>
  <div class="loader-container" v-if="loading">
    <CircleLoader
      :size="100"
      :stroke-gap="10"
      stroke-width="5px"
      stroke-color="rgb(58,141,245)"
      class="circle-loader"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import CircleLoader from "./CircleLoader.vue";

export default defineComponent({
  components: {
    CircleLoader,
  },

  setup() {
    const store = useStore();

    const loading = computed(() => store.loading);

    return {
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.loader-container {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.1);
}

.circle-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
