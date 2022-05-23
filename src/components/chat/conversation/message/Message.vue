<template>
  <div>
    <ToMessage
      v-if="message.to === selectedContact.email"
      :date="messageDate"
      :body="message.body"
      :isPlain="isPlainMessage"
      @delete="deleteMessage"
      @onIframeLoad="onIframeLoad"
    />

    <FromMessage
      v-if="message.from === selectedContact.email"
      :date="messageDate"
      :body="message.body"
      :isPlain="isPlainMessage"
      @delete="deleteMessage"
      @onIframeLoad="onIframeLoad"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ContentType, Message } from "@/types/chat";
import { DateUtils } from "@/utils/date";
import ToMessage from "./ToMessage.vue";
import FromMessage from "./FromMessage.vue";
import { useStore } from "@/store";

enum MaxIframeSize {
  Width = 400,
  Height = 300,
}

export default defineComponent({
  name: "MessageComponent",

  components: {
    ToMessage,
    FromMessage,
  },

  props: {
    message: {
      type: Object as PropType<Message>,
      default: null,
    },
  },

  setup(props) {
    const store = useStore();

    const selectedContact = computed(() => store.selectedContact);

    const isPlainMessage = computed(
      () => props.message?.contentType === ContentType.Plain
    );

    const messageDate = computed(() => {
      if (!props.message) return "";

      const date = new Date(props.message.date);

      const diff = DateUtils.getDifferenceWithNow(date);

      if (diff.minutes < 1) {
        const seconds = (diff.minutes * 60).toFixed();
        return `${seconds} seconds ago`;
      }

      if (diff.minutes <= 10) return `${diff.minutes.toFixed()} minutes ago`;

      return DateUtils.formatDate(date, "hh:mm, dd LLL yyyy");
    });

    async function deleteMessage() {
      if (!props.message) return;

      store.$patch({ loading: true });

      try {
        await store.deleteMessage(props.message);
      } catch (error) {
        console.error(error);
      } finally {
        store.$patch({ loading: false });
      }
    }

    function onIframeLoad(event: Event) {
      const target = event.target as HTMLIFrameElement;
      if (!target) return;

      const documentElement = target.contentWindow?.document.documentElement;
      if (!documentElement) return;

      const contentHeight = documentElement.scrollHeight;
      target.style.height =
        Math.min(MaxIframeSize.Height, contentHeight) + "px";

      const contentWidth = documentElement.scrollWidth;
      target.style.width = Math.min(MaxIframeSize.Width, contentWidth) + "px";
    }

    return {
      messageDate,
      isPlainMessage,
      selectedContact,

      onIframeLoad,
      deleteMessage,
    };
  },
});
</script>
