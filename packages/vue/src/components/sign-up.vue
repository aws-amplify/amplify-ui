<template>
  <slot v-bind="$attrs" name="signUpSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onSignUpSubmit">
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-heading class="amplify-heading" :level="3">
            <template #headingI>
              <slot name="heading"></slot>
            </template>
            {{ signUpButtonText }}
          </base-heading>
          <base-field-set
            class="amplify-flex"
            style="flex-direction: column"
            :disabled="actorState.matches('signUp.submit')"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signup-fields" :info="slotData"> </slot>
            </template>
            <sign-up-form-fields />
          </base-field-set>
          <base-alert v-if="actorState.context.remoteError">
            {{ actorState.context.remoteError }}
          </base-alert>
          <base-button
            class="amplify-button amplify-field-group__control"
            data-fullwidth="true"
            data-loading="false"
            data-variation="primary"
            style="border-radius: 0px; font-weight: normal"
            :disabled="actorState.matches('signUp.submit')"
            >{{ createAccountLabel }}</base-button
          >
          <base-footer>
            <template #footert="{ slotData }">
              <slot
                name="footer"
                :info="slotData"
                :onHaveAccountClicked="onHaveAccountClicked"
                :onSignUpSubmit="onSignUpSubmit"
              >
              </slot>
            </template>
            <federated-sign-in></federated-sign-in>
          </base-footer>
        </base-wrapper>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { getActorState, SignUpState, translate } from '@aws-amplify/ui';

import FederatedSignIn from './federated-sign-in.vue';
import SignUpFormFields from './sign-up-form-fields.vue';

import { useAuth } from '../composables/useAuth';

const attrs = useAttrs();
const emit = defineEmits(['haveAccountClicked', 'signUpSubmit']);

const { state, send } = useAuth();

const actorState: ComputedRef<SignUpState> = computed(() =>
  getActorState(state.value)
);

// computed properties

const createAccountLabel = computed(() => translate('Create Account'));
const signUpButtonText = computed(() => translate('Create a new account'));

// Methods

const onHaveAccountClicked = (): void => {
  if (attrs?.onHaveAccountClicked) {
    emit('haveAccountClicked');
  } else {
    send({
      type: 'SIGN_IN',
    });
  }
};

const onInput = (e: Event): void => {
  let { checked, name, type, value } = <HTMLInputElement>e.target;

  if (type === 'checkbox' && !checked)
    (value as string | undefined) = undefined;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};
const onSignUpSubmit = (e: Event): void => {
  if (attrs?.onSignUpSubmit) {
    emit('signUpSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  send({
    type: 'SUBMIT',
  });
};
</script>
