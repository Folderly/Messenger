<template>
  <div class="xl:h-screen mr-auto ml-auto flex">
    <TopPanel v-if="currentUser" />

    <div class="main-content flex flex-1 w-full">
      <RecentChats v-if="contacts" />

      <Chat v-if="selectedContact" />

      <SelectChat v-if="contacts && !selectedContact" />
    </div>
  </div>
</template>

<script lang="ts">
import RecentChats from "./contacts/RecentChats.vue";
import TopPanel from "./top-bar/TopBar.vue";

import Chat from "./chat/Chat.vue";
import SelectChat from "./chat/SelectChat.vue";

import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "MainPage",

  components: {
    Chat,
    TopPanel,
    RecentChats,
    SelectChat,
  },

  setup() {
    const store = useStore();

    const selectedContact = computed(() => store.selectedContact);
    const contacts = computed(() => store.contacts);
    const currentUser = computed(() => store.currentUser);

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

    return {
      selectedContact,
      contacts,
      currentUser,
    };
  },
});
</script>

<style scoped>
.main-content {
  padding-top: 64px;

  padding-left: 150px;
  padding-right: 150px;
}
</style>
