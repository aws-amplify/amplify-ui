<template>
  <Label>
    <Text>{{ phoneNumberLabel }}</Text>

    <div class="flex">
      <Select
        v-model:selectValue="phonePreFix"
        name="phone_number_prefix"
        :options="options"
        class="border"
      />
      <Input
        v-model:textValue="phoneNumber"
        name="phone_number"
        class="border phone"
        required
        type="tel"
        placeholder="(555) 555-1212"
        maxlength="14"
      ></Input>
    </div>
  </Label>
</template>

<script lang="ts">
import Input from "./primitives/Input.vue";
import Text from "./primitives/Text.vue";
import Label from "./primitives/Label.vue";
import Select from "./primitives/Select.vue";
import { defineComponent, computed, ref, watchEffect } from "vue";
import { PHONE_NUMBER_LABEL } from "../defaults/DefaultTexts";

export default defineComponent({
  components: {
    Input,
    Text,
    Label,
    Select
  },
  setup(_, { emit }: { emit: (st, e?) => unknown }) {
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
