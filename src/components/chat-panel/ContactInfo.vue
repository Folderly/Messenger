<template>
  <div
    class="intro-y box border border-theme-3 dark:bg-dark-2 dark:border-dark-2 flex items-center px-5 py-4"
    v-if="selectedContact"
  >
    <div class="flex items-center mr-auto">
      <div class="w-12 h-12 flex-none image-fit mr-1">
        <img
          alt="Topson Messenger Tailwind HTML Admin Template"
          class="rounded-full"
          :src="require('@/assets/images/icons8-test-account-80.png')"
        />
      </div>
      <div class="ml-2 overflow-hidden">
        <div class="text-base font-medium">
          {{ selectedContact.name || selectedContact.email }}
        </div>
        <div class="text-gray-600" v-if="selectedContact.name">
          {{ selectedContact.email }}
        </div>
      </div>
    </div>
    <a class="text-gray-600 hover:text-theme-1" href="">
      <i data-feather="camera" class="w-4 h-4 sm:w-6 sm:h-6"></i>
    </a>
    <a class="text-gray-600 hover:text-theme-1 ml-2 sm:ml-5" href="">
      <i data-feather="mic" class="w-4 h-4 sm:w-6 sm:h-6"></i>
    </a>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
export default {
  name: "ContactInfo",

  setup() {
    const store = useStore();

    const { selectedContact } = storeToRefs(store);

    return {
      selectedContact,
    };
  },
};
</script>
