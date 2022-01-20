<template>
  <base-wrapper
    class="
      amplify-flex amplify-field amplify-textfield amplify-phonenumberfield
    "
    style="flex-direction: column"
  >
    <base-label
      class="amplify-label sr-only"
      for="amplify-field-601d"
      v-bind="$attrs"
    >
      {{ label }}
    </base-label>
    <base-wrapper class="amplify-flex amplify-field-group">
      <base-wrapper class="amplify-field-group__outer-start">
        <!--Drop Down-->
        <template v-if="type === 'tel'">
          <base-wrapper
            class="
              amplify-flex
              amplify-field
              amplify-selectfield
              amplify-countrycodeselect
            "
            style="flex-direction: column"
          >
            <base-label class="amplify-label sr-only" for="amplify-field-1177">
              {{ 'Country Code' }}
            </base-label>
            <base-wrapper class="amplify-select__wrapper">
              <base-select
                class="amplify-select amplify-field-group__control"
                id="amplify-field-1177"
                aria-label="country code"
                name="country_code"
                :options="dialCodes"
                :selectValue="defaultDialCode"
              >
              </base-select>
              <base-wrapper
                class="amplify-flex amplify-select__icon-wrapper"
                style="align-items: center; justify-content: center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="amplify-icon"
                  viewBox="0 0 24 24"
                  data-size="large"
                  fill="currentColor"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </base-wrapper>
            </base-wrapper>
          </base-wrapper>
        </template>
      </base-wrapper>

      <base-wrapper class="amplify-field-group__field-wrapper">
        <!--input field-->
        <base-input
          class="amplify-input amplify-field-group__control"
          id="amplify-field-601d"
          aria-invalid="false"
          :textValue="uName"
          autocomplete="username"
          :placeholder="label"
          required
          :name="name"
          :disabled="disabled"
          :type="type"
        ></base-input>
      </base-wrapper>
    </base-wrapper>
  </base-wrapper>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef } from 'vue';
import {
  authInputAttributes,
  getActorContext,
  getAliasInfoFromContext,
  ActorContextWithForms,
  countryDialCodes,
  translate,
  LoginMechanism,
} from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

interface PropsInterface {
  userNameAlias?: boolean;
  userName?: string;
  disabled?: boolean;
}

const { userNameAlias, userName, disabled } = withDefaults(
  defineProps<PropsInterface>(),
  {
    userNameAlias: false,
    userName: '',
    disable: false,
  }
);

const { state } = useAuth();

const {
  value: { context },
} = state;

const actorContext: ComputedRef<ActorContextWithForms> = computed(() =>
  getActorContext(state.value)
);

const defaultDialCode = actorContext.value.country_code;

let uName = ref('');

if (userName) {
  uName = computed(() => userName);
}

const dialCodes = computed(() => countryDialCodes);

const [primaryAlias] = useAliases(
  context?.config?.loginMechanisms as LoginMechanism[]
);

let name = primaryAlias;
let label =
  authInputAttributes[primaryAlias as LoginMechanism]?.label ??
  authInputAttributes['username'].label;
let type =
  authInputAttributes[name as LoginMechanism]?.type ??
  authInputAttributes['username'].label;

// Only show for Sign In
if (userNameAlias) {
  const aliasInfo = getAliasInfoFromContext(context);
  label = aliasInfo.label || authInputAttributes['username'].label;
  type = aliasInfo.type;
  name = 'username';
}
label = translate<string>(label);
</script>
