<template>
  <div class="intro-x chat-text-box flex items-end mr-0 mb-4 message">
    <div class="w-full">
      <div>
        <div class="chat-text-box__content flex items-center float-right">
          <div class="sm:block relative mr-3 mt-3">
            <img
              class="w-4 h-4 dropdown-icon"
              @click="showDropdown = !showDropdown"
              :src="require('@/assets/icons/dots.svg')"
            />

            <Transition name="fade">
              <div class="dropdown-modal w-40" v-if="showDropdown">
                <div class="box dark:bg-dark-1 p-2">
                  <div
                    @click="deleteMessage"
                    class="delete-btn flex items-center p-2 bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    Move to Trash
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <div
            class="box leading-relaxed bg-theme-1 text-opacity-80 text-white px-4 py-3 mt-3"
          >
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="clear-both mb-2"></div>
      <div class="text-gray-600 text-xs text-right">{{ messageDate }}</div>
    </div>
    <div
      class="chat-text-box__photo w-10 h-10 hidden sm:block flex-none image-fit relative ml-4"
    >
      <img
        alt="Topson Messenger Tailwind HTML Admin Template"
        class="rounded-full"
        :src="require('@/assets/images/icons8-test-account-80.png')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ToMessage",

  props: {
    messageDate: String,
    default: () => "",
  },

  setup(_, { emit }) {
    const showDropdown = ref(false);

    function deleteMessage() {
      emit("delete");
    }

    return {
      showDropdown,
      deleteMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.message {
  margin-left: auto;
  margin-right: 0;
}

.dropdown-icon {
  position: relative;
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
