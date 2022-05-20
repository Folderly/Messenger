<template>
  <div class="intro-x" v-if="contact">
    <div class="zoom-in">
      <div
        class="chat-list box cursor-pointer relative flex items-center px-4 py-3"
        :class="{ 'bg-theme-1': isChosenContact }"
      >
        <div class="w-12 h-12 flex-none image-fit mr-1">
          <img
            alt="Topson Messenger Tailwind HTML Admin Template"
            class="rounded-full"
            :src="require('@/assets/images/icons8-test-account-80.png')"
          />
        </div>

        <div class="ml-2 overflow-hidden">
          <div
            class="font-medium w-28 truncate text-gray-800 dark:text-white"
            :class="{ 'text-white': isChosenContact }"
          >
            {{ contact.name || contact.email }}
          </div>
          <div
            class="text-opacity-80 w-4/5 truncate mt-0.5 text-gray-800 dark:text-white"
            :class="{ 'text-white': isChosenContact }"
          >
            {{ contact.lastMessage.body }}
          </div>
        </div>
        <div class="flex flex-col message-time">
          <div
            class="whitespace-nowrap text-opacity-80 text-xs text-gray-800 dark:text-white"
            :class="{ 'text-white': isChosenContact }"
          >
            {{ messageTime }}
          </div>
        </div>

        <div
          class="bg-theme-1 flex items-center justify-center absolute top-0 right-0 text-xs rounded-full font-medium mr-4"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Contact } from "@/types/chat";
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "@/store";
import { isEqual } from "lodash";
import { DateUtils } from "@/utils/date";

export default defineComponent({
  name: "ChatContact",

  props: {
    contact: Object as PropType<Contact>,
    default: null,
  },

  setup(props) {
    const store = useStore();

    const messageTime = computed(() => {
      if (props.contact)
        return DateUtils.formateNumberDate(
          props.contact.lastMessage.date,
          "hh:mm a"
        );

      return null;
    });

    const isChosenContact = computed(() =>
      isEqual(store.selectedContact, props.contact)
    );

    return {
      messageTime,
      isChosenContact,
    };
  },
});
</script>

<style scoped>
.message-time {
  flex: 1 0 auto;
  text-align: end;
}
</style>
