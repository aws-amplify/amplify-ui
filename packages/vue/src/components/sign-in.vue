<script setup lang="ts">
import { computed, ComputedRef, useAttrs, toRefs } from 'vue';
import {
  getActorContext,
  getAliasInfoFromContext,
  translate,
  SignInContext,
  countryDialCodes,
  AuthFormData,
} from '@aws-amplify/ui';

import PasswordControl from './password-control.vue';
import FederatedSignIn from './federated-sign-in.vue';

// @xstate
import { useAuthenticator } from '../composables/useAuth';

const attrs = useAttrs();
const emit = defineEmits([
  'signInSubmit',
  'forgotPasswordClicked',
  'createAccountClicked',
]);

const passwordLabel = computed(() => translate('Password'));
const forgotYourPasswordLink = computed(() =>
  translate('Forgot your password? ')
);

const signInButtonText = computed(() => translate('Sign in'));

const { error, isPending, state } = toRefs(useAuthenticator());
const { send, submitForm, updateForm } = useAuthenticator();
const { label, type } = getAliasInfoFromContext(state.value.context);
const actorContext = computed(() => {
  return getActorContext(state.value);
}) as ComputedRef<SignInContext>;

const formValues = actorContext.value?.formValues as AuthFormData;

const phoneNumber = computed(
  () =>
    `${actorContext.value.formValues?.country_code ?? ''}${
      actorContext.value.formValues?.phone ?? ''
    }`
);

// Methods

const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  updateForm({ name, value });
};

const onSignInSubmit = (e: Event): void => {
  if (attrs?.onSignInSubmit) {
    emit('signInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  const formData = new FormData(<HTMLFormElement>e.target);
  // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
  submitForm(Object.fromEntries(formData));
};

const onForgotPasswordClicked = (): void => {
  if (attrs?.onForgotPasswordClicked) {
    emit('forgotPasswordClicked');
  } else {
    send({ type: 'RESET_PASSWORD' });
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="signInSlotI">
    <slot name="header"></slot>

    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-signin
        @input="onInput"
        @submit.prevent="onSignInSubmit"
        method="post"
      >
        <template #formt="{ slotData }">
          <slot
            name="form"
            :info="slotData"
            :onSignInSubmit="onSignInSubmit"
            :onInput="onInput"
            :onForgotPasswordClicked="onForgotPasswordClicked"
          >
          </slot>
        </template>
        <federated-sign-in></federated-sign-in>
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-field-set
            :disabled="isPending"
            class="amplify-flex"
            style="flex-direction: column"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signin-fields" :info="slotData"> </slot>
            </template>

            <base-wrapper
              class=" amplify-flex amplify-field amplify-textfield amplify-phonenumberfield"
              style="flex-direction: column"
            >
              <base-label
                class="sr-only amplify-label"
                for="amplify-field-601d"
                v-bind="$attrs"
              >
                {{ translate(label) }}
              </base-label>
              <base-wrapper
                v-if="type === 'tel'"
                class="amplify-flex amplify-field-group"
              >
                <base-wrapper class="amplify-field-group__outer-start">
                  <!--Drop Down-->
                  <input
                    name="username"
                    readOnly
                    type="hidden"
                    :value="phoneNumber"
                  />

                  <base-wrapper
                    class=" amplify-flex amplify-field amplify-selectfield amplify-countrycodeselect"
                    style="flex-direction: column"
                  >
                    <base-label
                      class="sr-only amplify-label"
                      for="amplify-field-1177"
                    >
                      {{ 'Country Code' }}
                    </base-label>
                    <base-wrapper class="amplify-select__wrapper">
                      <base-select
                        class="amplify-select amplify-field-group__control"
                        id="amplify-field-1177"
                        aria-label="country code"
                        name="country_code"
                        :options="countryDialCodes"
                        :selectValue="formValues.country_code"
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
                          <path
                            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                          ></path>
                        </svg>
                      </base-wrapper>
                    </base-wrapper>
                  </base-wrapper>
                </base-wrapper>
                <amplify-text-field
                  id="amplify-field-601d"
                  aria-invalid="false"
                  autocomplete="username"
                  :labelHidden="true"
                  :placeholder="translate(label)"
                  :required="true"
                  name="phone"
                  :disabled="isPending"
                  type="tel"
                />
              </base-wrapper>

              <base-input
                class="amplify-input amplify-field-group__control"
                id="amplify-field-601d"
                autocomplete="username"
                :label="translate(label)"
                :labelHidden="true"
                name="username"
                :required="true"
                :placeholder="translate(label)"
                :type="type"
              />
            </base-wrapper>

            <base-wrapper
              class=" amplify-flex amplify-field amplify-textfield amplify-passwordfield password-field"
              style="flex-direction: column"
            >
              <password-control
                name="password"
                :label="passwordLabel"
                autocomplete="current-password"
                :ariainvalid="false"
              />
            </base-wrapper>
          </base-field-set>
          <base-alert v-if="error">
            {{ translate(error) }}
          </base-alert>

          <amplify-button
            :disabled="isPending"
            class="amplify-field-group__control"
            :fullwidth="true"
            data-loading="false"
            :variation="'primary'"
            style="border-radius: 0x; font-weight: normal"
          >
            {{ signInButtonText }}
          </amplify-button>
        </base-wrapper>
      </base-form>
    </base-wrapper>

    <base-footer>
      <slot name="footer">
        <div data-amplify-footer>
          <amplify-button
            @click="onForgotPasswordClicked"
            class="amplify-field-group__control"
            data-fullwidth="true"
            data-size="small"
            data-variation="link"
            style="font-weight: normal"
            type="button"
          >
            {{ forgotYourPasswordLink }}
          </amplify-button>
        </div>
      </slot>
    </base-footer>
  </slot>
</template>
