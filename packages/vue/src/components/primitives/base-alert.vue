<script setup>
import { ref } from 'vue';
import { translate } from '@aws-amplify/ui';

const show = ref(true);

const dismissAriaLabel = translate('Dismiss alert');

function close() {
  show.value = false;
}
</script>

<template>
  <div
    v-if="show"
    class="amplify-flex amplify-alert amplify-alert--error amplify-authenticator__base"
    data-variation="error"
    role="alert"
  >
    <div class="amplify-flex amplify-authenticator__icon-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="amplify-icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        ></path>
      </svg>
      <div><slot></slot></div>
    </div>
    <amplify-button
      class="amplify-field-group__control amplify-alert__dismiss"
      :aria-label="dismissAriaLabel"
      :fullwidth="false"
      :variation="'link'"
      type="button"
      @click="close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="amplify-icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
    </amplify-button>
  </div>
</template>
