<template>
  <div class="overflow-y-scroll scrollbar-hidden pt-5 flex-1">
    <div v-for="(message, index) in messages" :key="`${index}`">
      <Message :message="message" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, watch } from "vue";
import { useStore } from "@/store";
import Message from "./message/Message.vue";

export default {
  name: "ConversationPanel",

  components: {
    Message,
  },

  setup() {
    const store = useStore();

    const messages = computed(() => {
      return store.messages;
    });

    watch(
      () => store.selectedContact,
      async () => {
        await fetchMessages();
      },
      {
        immediate: true,
      }
    );

    async function fetchMessages() {
      store.$patch({ loading: true });

      try {
        await store.fetchMessages();
      } catch (error) {
        console.error(error);
      } finally {
        store.$patch({ loading: false });
      }
    }

    return {
      messages,
    };
  },
};
</script>
