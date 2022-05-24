<template>
  <div
    class="intro-y chat-input box border-theme-3 dark:bg-dark-2 dark:border-dark-2 border flex items-center px-5 py-4"
  >
    <textarea
      class="form-control h-12 shadow-none resize-none border-transparent px-5 py-3 focus:shadow-none truncate mr-3"
      placeholder="Type your message..."
      v-model="message"
    ></textarea>

    <div
      class="bg-theme-1 text-white w-8 h-8 sm:w-10 sm:h-10 block rounded-full flex-none flex items-center justify-center"
      @click="sendMessage"
    >
      <img class="w-8 h-5" :src="require('@/assets/icons/message.svg')" />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SendMessage",

  setup() {
    const store = useStore();

    const message = ref("");

    async function sendMessage() {
      if (!message.value) return;

      store.$patch({ loading: true });

      try {
        await store.sendMessage(message.value);

        message.value = "";
      } catch (error) {
        console.error(error);
      } finally {
        store.$patch({ loading: false });
      }
    }

    return {
      message,
      sendMessage,
    };
  },
});
</script>
