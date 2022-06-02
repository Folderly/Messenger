<template>
  <div
    class="wrap w-full min-h-screen p-5 md:p-20 flex items-center justify-center"
  >
    <div class="overlay"></div>
    <div class="intro-y auth">
      <div
        class="text-4xl font-bold mb-10 text-white"
        style="text-align: center"
      >
        Folderly Messenger
      </div>
      <div class="intro-y box px-5 py-8 mt-8">
        <div
          class="intro-y text-gray-700 dark:text-gray-300 text-xl font-small text-center mb-5"
        >
          Login to Your Account
        </div>
        <div class="intro-y container">
          <div class="sign-in-btn" @click="signIn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AuthAPI } from "@/api/auth";

async function signIn() {
  const redirectUrl = await AuthAPI.signIn();

  window.location.href = redirectUrl;
}
</script>

<style lang="scss" scoped>
.wrap {
  background-image: url("~@/assets/images/sign-in-min.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.4);
}

.sign-in-btn {
  margin: auto;
  width: 250px;
  content: url("~@/assets/images/btn_google_signin_light_normal_web@2x.png");
}

.sign-in-btn:hover {
  cursor: pointer;
}

.sign-in-btn:active {
  content: url("~@/assets/images/btn_google_signin_light_pressed_web@2x.png");
}
</style>
