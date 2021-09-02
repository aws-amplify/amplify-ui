<template>
  <base-label>
    <base-text>{{ phoneNumberLabel }}</base-text>

    <div class="flex">
      <base-input
        v-model:textValue="phoneNumber"
        name="phone_number"
        class="border phone"
        required
        type="tel"
        placeholder="+1 (555) 555-1212"
        maxlength="17"
      ></base-input>
    </div>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import { I18n } from 'aws-amplify';

import BaseInput from './primitives/base-input.vue';
import BaseText from './primitives/base-text.vue';
import BaseLabel from './primitives/base-label.vue';

import { PHONE_NUMBER_LABEL } from '../defaults/DefaultTexts';
import { SignUpPhoneControlTypes } from '../types';

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
  },
  setup(
    _,
    { emit }: { emit: (eventName: string, payload?: unknown) => void }
  ): SignUpPhoneControlTypes {
    const phoneNumberLabel = computed(() => I18n.get(PHONE_NUMBER_LABEL));

    const options = [{ value: '+1' }, { value: '+7' }, { value: '+20' }];
    const phonePreFix = ref(options[0].value);
    const phoneNumber = ref('');

    watchEffect(() => {
      emit('update:phone', `${phonePreFix.value}${phoneNumber.value}`);
    });
    return { phoneNumberLabel, options, phonePreFix, phoneNumber };
  },
});
</script>

<style scoped>
.phone {
  margin-top: 0;
  border-radius: 0;
}
</style>
