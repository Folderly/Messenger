<template>
  <div class="intro-x flex items-end mr-0 mb-4 wrap-message">
    <div>
      <div class="flex items-center">
        <div class="sm:block relative mr-3 mt-3">
          <img
            class="w-4 h-4 dropdown-icon"
            @click="showDropdown = !showDropdown"
            :src="require('@/assets/icons/dots.svg')"
          />

          <Transition name="fade">
            <div v-if="showDropdown" ref="dropdown" class="dropdown-modal w-40">
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
        <div class="box flex-1 leading-relaxed px-4 py-3 mt-3">
          <div class="plain-body" v-if="isPlain">
            {{ body }}
          </div>
          <iframe v-else :srcdoc="body" @load="onIframeLoad" />
        </div>
      </div>

      <div class="clear-both mb-2"></div>
      <div class="text-gray-600 text-xs text-right">{{ date }}</div>
    </div>

    <img
      class="rounded-full chat-text-box__photo w-10 h-10 sm:block image-fit relative ml-4"
      alt="Topson Messenger Tailwind HTML Admin Template"
      :src="require('@/assets/images/icons8-test-account-80.png')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export default defineComponent({
  name: "ToMessage",

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
      dropdown,
      showDropdown,

      deleteMessage,
      onIframeLoad,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrap-message {
  max-width: 70%;
  margin-left: auto;
  margin-right: 0;

  justify-content: end;
}

.dropdown-icon {
  position: relative;
  cursor: pointer;
}

.delete-btn {
  cursor: pointer;
}

.dropdown-modal {
  z-index: 9999;
  position: absolute;

  top: 10px;
  left: -160px;
}

.plain-body {
  white-space: pre-wrap;
}

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
