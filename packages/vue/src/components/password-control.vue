<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { translate } from '@aws-amplify/ui';

const showPassword = translate('Show password');
const hidePassword = translate('Hide password');
const showHideType = ref('password');
const showHideLabel = ref(showPassword);

const random = Math.floor(Math.random() * 999999);

const props = defineProps({
  name: String,
  label: String,
  autocomplete: String,
  ariainvalid: Boolean,
});

const { name, label, autocomplete, ariainvalid } = toRefs(props);

let password = ref('');

function togglePasswordText(): void {
  showHideLabel.value =
    showHideLabel.value === showPassword ? hidePassword : showPassword;
  showHideType.value = showHideType.value === 'password' ? 'text' : 'password';
}
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <base-label class="amplify-label sr-only" :for="'amplify-field-' + random">
    {{ label }}
  </base-label>
  <base-wrapper class="amplify-flex amplify-field-group">
    <base-input
      v-bind="$attrs"
      v-model="password"
      class="amplify-input amplify-field-group__control"
      :aria-invalid="ariainvalid"
      :id="'amplify-field-' + random"
      data-amplify-password="true"
      :name="name"
      :autocomplete="autocomplete"
      required
      :placeholder="label"
      :type="showHideType"
    />
    <base-wrapper class="amplify-field-group__outer-end">
      <button
        :aria-label="showHideLabel"
        class="
          amplify-button
          amplify-field-group__control
          amplify-field__show-password
        "
        data-fullwidth="false"
        type="button"
        @click="togglePasswordText"
      >
        <svg
          v-if="showHideType === 'password'"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="amplify-icon"
        >
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="amplify-icon"
        >
          <path
            d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
            fill="none"
          ></path>
          <path
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
          ></path>
        </svg>
      </button>
    </base-wrapper>
  </base-wrapper>
</template>
