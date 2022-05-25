<template>
  <div
    ref="conversation"
    class="overflow-y-scroll scrollbar-hidden pt-5 flex-1"
  >
    <div ref="conversationContent">
      <div v-for="message in messages" :key="message.id">
        <Message :message="message" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";
import Message from "./message/Message.vue";

export default {
  name: "ConversationPanel",

  components: {
    Message,
  },

  setup() {
    const store = useStore();

    const conversation = ref<HTMLElement | null>(null);
    const conversationContent = ref<HTMLElement | null>(null);

    const resizeObserver = new ResizeObserver(() => {
      if (conversation.value && conversationContent.value)
        conversation.value.scrollTop = conversationContent.value.scrollHeight;
    });

    const messages = computed(() => {
      return store.messages;
    });

    onMounted(() => {
      if (conversationContent.value)
        resizeObserver.observe(conversationContent.value);
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
      conversation,
      conversationContent,
    };
  },
};
</script>
