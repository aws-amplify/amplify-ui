<template>
  <base-label>
    <base-text>{{ phoneNumberLabel }}</base-text>

    <div class="flex">
      <base-select
        v-model:selectValue="phonePreFix"
        name="phone_number_prefix"
        :options="options"
        class="border"
      />
      <base-input
        v-model:textValue="phoneNumber"
        name="phone_number"
        class="border phone"
        required
        type="tel"
        placeholder="(555) 555-1212"
        maxlength="14"
      ></base-input>
    </div>
  </base-label>
</template>

<script lang="ts">
import BaseInput from "./primitives/base-input.vue";
import BaseText from "./primitives/base-text.vue";
import BaseLabel from "./primitives/base-label.vue";
import BaseSelect from "./primitives/base-select.vue";
import { defineComponent, computed, ref, watchEffect } from "vue";
import { PHONE_NUMBER_LABEL } from "../defaults/DefaultTexts";
import { SignUpPhoneControlTypes } from "../types";

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
    BaseSelect
  },
  setup(
    _,
    { emit }: { emit: (eventName: string, payload?: unknown) => void }
  ): SignUpPhoneControlTypes {
    const phoneNumberLabel = computed(() => PHONE_NUMBER_LABEL);

    const options = [{ value: "+1" }, { value: "+7" }, { value: "+20" }];
    const phonePreFix = ref(options[0].value);
    const phoneNumber = ref("");

    watchEffect(() => {
      emit("update:phone", `${phonePreFix.value}${phoneNumber.value}`);
    });
    return { phoneNumberLabel, options, phonePreFix, phoneNumber };
  }
});
</script>

<style scoped>
.phone {
  margin-top: 0;
  border-radius: 0;
}
</style>
