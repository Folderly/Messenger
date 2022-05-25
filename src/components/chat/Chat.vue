<template>
  <div
    class="wrap chat-box border-theme-5 flex flex-col overflow-hidden xl:border-l xl:border-r"
  >
    <ContactInfo />

    <Conversation />

    <SendMessage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import ContactInfo from "./ContactInfo.vue";
import Conversation from "./conversation/Conversation.vue";
import SendMessage from "./SendMessage.vue";

export default defineComponent({
  components: {
    ContactInfo,
    Conversation,
    SendMessage,
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  flex: 1 1 70%;
  padding: 2rem 1.5rem 2rem 1.5rem;
}
</style>
