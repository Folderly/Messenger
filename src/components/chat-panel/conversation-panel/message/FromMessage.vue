<template>
  <div class="-intro-x chat-text-box flex items-end float-left mb-4 message">
    <div
      class="chat-text-box__photo w-10 h-10 hidden sm:block flex-none image-fit relative mr-4"
    >
      <img
        alt="Topson Messenger Tailwind HTML Admin Template"
        class="rounded-full"
        :src="require('@/assets/images/icons8-test-account-80.png')"
      />
    </div>
    <div class="w-full">
      <div>
        <div class="chat-text-box__content flex items-center float-left">
          <div
            class="box leading-relaxed dark:text-gray-300 text-gray-700 px-4 py-3 mt-3"
          >
            <slot></slot>
          </div>
          <div class="hidden sm:block dropdown relative ml-3 mt-3">
            <img
              class="w-4 h-4 dropdown-icon"
              @click="showDropdown = !showDropdown"
              :src="require('@/assets/icons/dots.svg')"
            />

            <Transition name="fade">
              <div class="dropdown-modal w-40" v-if="showDropdown">
                <div class="box dark:bg-dark-1 p-2">
                  <div
                    class="delete-btn flex items-center p-2 bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    Move to Trash
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="clear-both mb-2"></div>
      <div class="text-gray-600 text-xs">{{ messageDate }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FromMessage",

  props: {
    messageDate: String,
    default: () => "",
  },

  setup() {
    const showDropdown = ref(false);

    return {
      showDropdown,
    };
  },
});
</script>

<style lang="scss">
.message {
  margin-left: auto;
  margin-right: 0;
}

.delete-btn {
  cursor: pointer;
}

.dropdown-icon {
  position: relative;
}

.dropdown-modal {
  z-index: 9999;
  position: absolute;

  top: 10px;
  left: 15px;
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
