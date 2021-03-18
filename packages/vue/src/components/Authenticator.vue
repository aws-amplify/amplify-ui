<template>
  <div data-spark-authenticator="">
    <SignIn>
      <template #signInSlotI="{ resetPasswordClicked }">
        <slot
          name="sign-in"
          :resetPasswordClicked="resetPasswordClicked"
        ></slot>
      </template>
    </SignIn>
  </div>
</template>

<script lang="ts">
import SignIn from "./SignIn.vue";

export default {
  components: {
    SignIn,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
