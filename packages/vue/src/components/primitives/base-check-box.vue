<script setup lang="ts">
import { ref, toRefs } from 'vue';
const checked = ref(false);

const props = withDefaults(defineProps<{ errorMessage: string }>(), {
  errorMessage: '',
});

const { errorMessage } = toRefs(props);
</script>
<template>
  <div class="amplify-flex amplify-field amplify-checkboxfield">
    <label class="amplify-flex amplify-checkbox"
      ><span class="amplify-visually-hidden"
        ><input
          @click="checked = !checked"
          class="
            amplify-input
            amplify-field-group__control
            amplify-checkbox__input
          "
          aria-invalid="false"
          type="checkbox"
          name="acknowledgement"
          value="yes" /></span
      ><span
        class="amplify-flex amplify-checkbox__button"
        aria-hidden="true"
        data-focus="false"
        :data-error="!checked"
        :data-checked="checked"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="amplify-icon amplify-checkbox__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          :data-checked="checked"
        >
          <path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
          ></path></svg></span
      ><span class="amplify-text amplify-checkbox__label">
        I agree with the Terms &amp; Conditions</span
      ></label
    >
    <p v-if="!checked" class="amplify-text amplify-field__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>
