<script setup lang="ts">
import {
  CREATE_ACCOUNT_LABEL,
  SIGN_IN_LABEL,
} from '../../defaults/DefaultTexts';
import { I18n } from 'aws-amplify';
import { computed, ref } from 'vue';

const signInLabel = computed(() => I18n.get(CREATE_ACCOUNT_LABEL));
const createAccountLabel = computed(() => I18n.get(SIGN_IN_LABEL));

const emit = defineEmits(['baseTab']);

const active = ref(false);

function toggleTabs(val: string): void {
  emit('baseTab', active.value);
  active.value = !active.value;
}
</script>

<template>
  <base-wrapper
    tabindex="0"
    aria-orientation="horizontal"
    data-orientation="horizontal"
    role="tablist"
    style="outline: none"
  >
    <base-wrapper
      class="amplify-flex amplify-tabs"
      style="gap: 0px; justify-content: center"
    >
      <base-wrapper
        @click="toggleTabs(createAccountLabel)"
        :tabindex="!active ? 0 : -1"
        :data-state="!active ? 'active' : 'inactive'"
        :aria-selected="!active ? 'true' : 'false'"
        data-orientation="horizontal"
        role="tab"
        aria-controls="radix-id-2592219542-8-content-0"
        id="radix-id-2592219542-8-trigger-0"
        class="amplify-tabs-item"
        data-grow="equal"
        data-radix-collection-item=""
      >
        {{ createAccountLabel }}
      </base-wrapper>
      <base-wrapper
        @click="toggleTabs(signInLabel)"
        :tabindex="active ? 0 : -1"
        :data-state="active ? 'active' : 'inactive'"
        :aria-selected="active ? 'true' : 'false'"
        data-orientation="horizontal"
        role="tab"
        aria-controls="radix-id-2592219542-8-content-1"
        id="radix-id-2592219542-8-trigger-1"
        class="amplify-tabs-item"
        data-grow="equal"
        data-radix-collection-item=""
      >
        {{ signInLabel }}
      </base-wrapper>
    </base-wrapper>
  </base-wrapper>
</template>
