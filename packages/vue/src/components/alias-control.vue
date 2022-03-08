<script setup lang="ts">
interface PropsInterface {
  label: string;
  name: string;
  placeholder?: string;
  autocomplete?: string;
  labelHidden?: boolean;
  required?: boolean;
  dialCode?: string;
  dialCodeList?: Array<string>;
  type?: string;
}

const {
  label,
  name,
  placeholder,
  autocomplete,
  labelHidden,
  required,
  dialCode,
  dialCodeList,
} = withDefaults(defineProps<PropsInterface>(), {
  label: 'Username',
  name: 'username',
  placeholder: '',
  autocomplete: '',
  labelHidden: false,
  required: true,
  type: 'text',
});
const random = Math.floor(Math.random() * 999999);
const randomPhone = Math.floor(Math.random() * 999999);
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
          v-if="type === 'tel'"
        >
          <base-label
            :for="'amplify-field-' + randomPhone"
            class="amplify-label amplify-visually-hidden"
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
              :options="dialCodeList"
              :select-value="dialCode"
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
          :autocomplete="autocomplete"
          :name="name"
          :required="required ?? true"
          :type="type"
          :placeholder="placeholder"
        ></base-input>
      </base-wrapper>
    </base-wrapper>
  </base-wrapper>
</template>
