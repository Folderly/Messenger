<template>
  <div class="w-full min-h-screen p-5 md:p-20 flex items-center justify-center">
    <div class="intro-y auth">
      <div
        class="intro-y text-gray-700 dark:text-gray-300 text-2xl font-medium text-center mt-16"
      >
        Login to Your Account
      </div>
      <div class="intro-y box px-5 py-8 mt-8">
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

<style lang="scss">
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
