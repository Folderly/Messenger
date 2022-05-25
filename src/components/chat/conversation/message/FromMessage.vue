<template>
  <div class="intro-x flex items-end mb-4 wrap-message">
    <img
      class="rounded-full w-10 h-10 sm:block image-fit relative mr-4"
      alt="Topson Messenger Tailwind HTML Admin Template"
      :src="require('@/assets/images/icons8-test-account-80.png')"
    />

    <div class="w-full">
      <div>
        <div class="flex items-center">
          <div
            class="box flex-1 leading-relaxed dark:text-gray-300 text-gray-700 px-4 py-3 mt-3"
          >
            <div v-if="isPlain">
              {{ body }}
            </div>
            <iframe v-else :srcdoc="body" @load="onIframeLoad" />
          </div>
          <div class="hidden sm:block dropdown relative ml-3 mt-3">
            <img
              class="dropdown-icon"
              @click="showDropdown = !showDropdown"
              :src="require('@/assets/icons/dots.svg')"
            />

            <Transition name="fade">
              <div
                v-if="showDropdown"
                ref="dropdown"
                class="dropdown-modal w-40"
              >
                <div class="box dark:bg-dark-1 p-2">
                  <div
                    @click="deleteMessage"
                    class="delete-btn flex items-center p-2 bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    <img
                      class="mr-2"
                      :src="require('@/assets/icons/delete.svg')"
                    />
                    Move to Trash
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="clear-both mb-2"></div>
      <div class="text-gray-600 text-xs">{{ date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { onClickOutside } from "@vueuse/core";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FromMessage",

  props: {
    date: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    isPlain: {
      type: Boolean,
      default: true,
    },
  },

  setup(_, { emit }) {
    const showDropdown = ref(false);
    const dropdown = ref<HTMLElement | null>();

    function deleteMessage() {
      emit("delete");
    }

    function onIframeLoad(event: Event) {
      emit("onIframeLoad", event);
    }

    onClickOutside(dropdown, (event) => (showDropdown.value = false));

    return {
      showDropdown,
      dropdown,

      deleteMessage,
      onIframeLoad,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrap-message {
  max-width: 70%;
}

.delete-btn {
  cursor: pointer;
}

.dropdown-icon {
  position: relative;
  cursor: pointer;
}

.dropdown-modal {
  z-index: 9999;
  position: absolute;

  top: 10px;
  left: 15px;
}
</style>

<style lang="scss">
.fade {
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }
}
</style>
