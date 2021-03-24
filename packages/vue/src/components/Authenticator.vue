<template>
  <div data-spark-authenticator="">
    <SignIn v-if="currentPage === 'SIGNIN'">
      <template #signInSlotI="{ resetPasswordClicked }">
        <slot
          name="sign-in"
          :resetPasswordClicked="resetPasswordClicked"
        ></slot>
      </template>
    </SignIn>
    <SignUp v-if="currentPage === 'SIGNUP'" />
  </div>
</template>

<script lang="ts">
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import { ref, provide, onMounted } from "vue";

export default {
  components: {
    SignIn,
    SignUp,
  },
  setup() {
    const currentPage = ref("SIGNIN");
    provide("pageInfo", currentPage);

    return { currentPage };
  },
};
</script>

<style scoped></style>
