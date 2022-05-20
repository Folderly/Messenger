<template>
  <div class="md:pl-16 pt-16">
    <div
      class="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6"
    >
      <TopPanel />

      <RecentChats />

      <div
        class="chat-box border-theme-5 col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6"
      >
        <ContactInfo />

        <Conversation />

        <SendMessage />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RecentChats from "./contacts-panel/RecentChats.vue";
import ContactInfo from "./chat-panel/ContactInfo.vue";
import Conversation from "./chat-panel/conversation-panel/Conversation.vue";
import SendMessage from "./chat-panel/SendMessage.vue";
import TopPanel from "./top-panel/TopPanel.vue";
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "MainPage",

  components: {
    TopPanel,
    RecentChats,
    ContactInfo,
    SendMessage,
    Conversation,
  },

  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.fetchCurrentUser();
    });
  },
});
</script>
