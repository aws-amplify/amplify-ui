<script setup lang="ts">
import { computed, ComputedRef, onMounted } from 'vue';
import {
  ActorContextWithForms,
  authInputAttributes,
  countryDialCodes,
  getActorContext,
  LoginMechanism,
} from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';

interface PropsInterface {
  label: string;
  name: string;
  placeholder?: string;
  autocomplete?: string;
  labelHidden?: boolean;
  required?: boolean;
}

const { label, name, placeholder, autocomplete, labelHidden, required } =
  withDefaults(defineProps<PropsInterface>(), {
    label: 'Username',
    name: 'username',
    placeholder: '',
    autocomplete: '',
    labelHidden: false,
    required: true,
  });
const random = Math.floor(Math.random() * 999999);
const randomPhone = Math.floor(Math.random() * 999999);

const { state, send } = useAuth();
const {
  value: { context },
} = state;

//computed
const inputAttributes = computed(() => authInputAttributes);
const actorContext: ComputedRef<ActorContextWithForms> = computed(() =>
  getActorContext(state.value)
);

const defaultDialCode = actorContext.value.country_code;

const dialCodes = computed(() => countryDialCodes);

onMounted(() => {
  if (inputAttributes.value[name as LoginMechanism]?.type === 'tel') {
    send({
      type: 'CHANGE',
      data: { name: 'country_code', value: defaultDialCode },
    });
  }
});

const inferAutocomplete = computed((): string => {
  return (
    autocomplete ||
    (authInputAttributes[name as LoginMechanism]?.autocomplete as string) ||
    name
  );
});
</script>

<template>
  <base-wrapper
    class="
      amplify-flex amplify-field amplify-textfield amplify-phonenumberfield
    "
    style="flex-direction: column"
  >
    <base-label
      :for="'amplify-field-' + random"
      class="amplify-label"
      :class="{ 'sr-only': labelHidden }"
      v-bind="$attrs"
    >
      {{ label }}
    </base-label>
    <base-wrapper class="amplify-flex amplify-field-group">
      <base-wrapper class="amplify-field-group__outer-start">
        <!--select drop down-->
        <base-wrapper
          class="
            amplify-flex
            amplify-field
            amplify-selectfield
            amplify-countrycodeselect
          "
          style="flex-direction: column"
          v-if="name === 'phone_number'"
        >
          <base-label
            :for="'amplify-field-' + randomPhone"
            class="amplify-label sr-only"
            v-bind="$attrs"
          >
            {{ 'Country Code' }}
          </base-label>
          <base-wrapper class="amplify-select__wrapper">
            <base-select
              class="amplify-select amplify-field-group__control"
              :id="'amplify-field-' + randomPhone"
              autocomplete="tel-country-code"
              aria-label="country code"
              name="country_code"
              :options="dialCodes"
              :select-value="defaultDialCode"
            >
            </base-select>
            <base-wrapper
              class="amplify-flex amplify-select__icon-wrapper"
              style="align-items: center; justify-content: center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-size="large"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="amplify-icon"
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>
            </base-wrapper>
          </base-wrapper>
        </base-wrapper>
      </base-wrapper>
      <base-wrapper class="amplify-field-group__field-wrapper">
        <!--Phone input-->
        <base-input
          class="amplify-input amplify-field-group__control"
          aria-invalid="false"
          :id="'amplify-field-' + random"
          :autocomplete="inferAutocomplete"
          :name="name"
          :required="required ?? true"
          :type="inputAttributes[name as LoginMechanism]?.type ?? 'text'"
          :placeholder="placeholder"
        ></base-input>
      </base-wrapper>
    </base-wrapper>
  </base-wrapper>
</template>
