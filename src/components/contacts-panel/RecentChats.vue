<template>
  <div
    class="side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden"
    data-content="chats"
  >
    <div class="intro-y text-base font-medium leading-tight mt-3">
      Recent Chats
    </div>
    <div class="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-5">
      <div class="user-list">
        <ChatContact
          class="contact"
          v-for="(contact, index) in contacts"
          :key="index"
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
import { computed, defineComponent, onMounted, ref } from "vue";
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

<style lang="scss">
.contact + .contact {
  margin-top: 20px;
}
</style>
