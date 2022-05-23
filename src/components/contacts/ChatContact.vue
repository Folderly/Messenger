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
            class="font-medium w-28 truncate dark:text-white"
            :class="{
              'text-white': isChosenContact,
              'text-gray-800': !isChosenContact,
            }"
          >
            {{ contact.name || contact.email }}
          </div>

          <div
            v-if="isPlainMessage"
            class="text-opacity-80 w-4/5 truncate mt-0.5 dark:text-white"
            :class="{
              'text-white': isChosenContact,
              'text-gray-800': !isChosenContact,
            }"
          >
            <span>{{ contact.lastMessage.body }}</span>
          </div>

          <span
            v-else
            class="label truncate text-gray-700 mt-1"
            :class="{
              'label-light': !isChosenContact,
              'label-dark text-gray-300': isChosenContact,
            }"
            >html content</span
          >
        </div>

        <div class="flex flex-col message-time">
          <div
            class="whitespace-nowrap text-opacity-80 text-xs dark:text-white"
            :class="{
              'text-white': isChosenContact,
              'text-gray-800': !isChosenContact,
            }"
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
import { Contact, ContentType } from "@/types/chat";
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

    const isChosenContact = computed(() => {
      return isEqual(store.selectedContact, props.contact);
    });

    const isPlainMessage = computed(
      () => props.contact?.lastMessage.contentType === ContentType.Plain
    );

    return {
      messageTime,
      isPlainMessage,

      isChosenContact,
    };
  },
});
</script>

<style lang="scss" scoped>
.message-time {
  flex: 1 0 auto;
  text-align: end;
}

.label {
  border-radius: 10px;

  padding: 2px 15px;

  text-align: center;
  font-size: 12px;

  &-dark {
    background-color: rgb(14, 108, 222);
  }

  &-light {
    background-color: rgb(216, 234, 255);
  }
}
</style>
