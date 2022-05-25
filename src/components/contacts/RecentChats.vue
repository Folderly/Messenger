<template>
  <div
    class="wrap side-content side-content--active flex-col overflow-hidden"
    data-content="chats"
  >
    <div class="intro-y text-base font-medium leading-tight">Recent Chats</div>
    <div class="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-5">
      <div class="user-list">
        <ChatContact
          class="contact"
          v-for="(contact, index) in contacts"
          :key="`${index}`"
          :contact="contact"
          @click="chooseContact(contact)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChatContact from "./ChatContact.vue";

import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { Contact } from "@/types/chat";

export default defineComponent({
  name: "RecentChats",

  components: {
    ChatContact,
  },

  setup() {
    const store = useStore();

    const contacts = computed(() => store.contacts);

    function chooseContact(contact: Contact) {
      store.$patch({
        selectedContact: contact,
      });
    }

    return {
      contacts,

      chooseContact,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  flex: 1;
  padding: 2rem 1.5rem 2rem 1.5rem;
}

.contact + .contact {
  margin-top: 20px;
}
</style>
