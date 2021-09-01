<template>
  <slot name="signUpSlotI">
    <base-wrapper data-amplify-wrapper>
      <base-form @submit.prevent="onSignUpSubmit" @input="onInput">
        <base-heading>
          <template #headingI>
            <slot name="heading"></slot>
          </template>
          {{ signUpButtonText }}
        </base-heading>
        <federated-sign-in></federated-sign-in>
        <base-field-set :disabled="actorState.matches('signUp.submit')">
          <template #fieldSetI="{ slotData }">
            <slot name="signup-fields" :info="slotData"> </slot>
          </template>
          <user-name-alias />
          <sign-up-password-control />
          <sign-up-confirm-password-control />
          <template v-for="(alias, idx) in secondaryAliases" :key="idx">
            <alias-control
              :label="inputAttributes[alias].label"
              :name="alias"
              :placeholder="inputAttributes[alias].placeholder"
            />
          </template>
        </base-field-set>
        <base-spacer />

        <base-box data-ui-error>
          {{ actorState.context.remoteError }}
        </base-box>

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
          <slot name="footer-left" :onHaveAccountClicked="onHaveAccountClicked">
            <base-text>{{ haveAccountLabel }}</base-text>
            <base-button type="button" @click.prevent="onHaveAccountClicked">
              {{ signInButtonText }}</base-button
            >
          </slot>
          <slot name="footer-right" :onSignUpSubmit="onSignUpSubmit">
            <base-button :disabled="actorState.matches('signUp.submit')">{{
              createAccountLabel
            }}</base-button>
          </slot>
        </base-footer>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
import {
  authInputAttributes,
  getActorState,
  SignUpState,
  socialProviderLoginMechanisms,
} from '@aws-amplify/ui';

import BaseForm from './primitives/base-form.vue';
import BaseBox from './primitives/base-box.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseHeading from './primitives/base-heading.vue';
import BaseText from './primitives/base-text.vue';
import BaseFieldSet from './primitives/base-field-set.vue';
import BaseFooter from './primitives/base-footer.vue';
import BaseButton from './primitives/base-button.vue';
import SignUpPasswordControl from './sign-up-password-control.vue';
import SignUpConfirmPasswordControl from './sign-up-confirm-password-control.vue';
import UserNameAlias from './user-name-alias.vue';
import AliasControl from './alias-control.vue';
import BaseWrapper from './primitives/base-wrapper.vue';
import FederatedSignIn from './federated-sign-in.vue';

import {
  SIGN_IN_BUTTON_TEXT,
  HAVE_ACCOUNT_LABEL,
  CREATE_ACCOUNT_LABEL,
  SIGN_UP_BUTTON_TEXT,
} from '../defaults/DefaultTexts';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

import { SetupEventContext, SignUpSetupReturnTypes } from '../types';

export default defineComponent({
  components: {
    BaseForm,
    BaseHeading,
    BaseText,
    BaseFieldSet,
    BaseFooter,
    BaseButton,
    SignUpPasswordControl,
    BaseWrapper,
    BaseBox,
    BaseSpacer,
    SignUpConfirmPasswordControl,
    UserNameAlias,
    AliasControl,
    FederatedSignIn,
  },
  inheritAttrs: false,
  setup(_, { emit, attrs }: SetupEventContext): SignUpSetupReturnTypes {
    const { state, send } = useAuth();

    const {
      value: { context },
    } = state;
    const actorState: ComputedRef<SignUpState> = computed(() =>
      getActorState(state.value)
    );

    let [__, ...secondaryAliases] = useAliases(
      context?.config?.login_mechanisms
    );

    secondaryAliases = secondaryAliases.filter(
      (alias) => !socialProviderLoginMechanisms.includes(alias)
    );

    // reactive properties

    const phone = ref('');

    // computed properties

    const signInButtonText = computed(() => SIGN_IN_BUTTON_TEXT);
    const haveAccountLabel = computed(() => HAVE_ACCOUNT_LABEL);
    const createAccountLabel = computed(() => CREATE_ACCOUNT_LABEL);
    const signUpButtonText = computed(() => SIGN_UP_BUTTON_TEXT);
    const inputAttributes = computed(() => authInputAttributes);

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
      const { name, value } = <HTMLInputElement>e.target;
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
        submit();
      }
    };

    const submit = (): void => {
      send({
        type: 'SUBMIT',
      });
    };

    return {
      onHaveAccountClicked,
      onSignUpSubmit,
      onInput,
      state,
      actorState,
      phone,
      submit,
      secondaryAliases,
      signInButtonText,
      haveAccountLabel,
      createAccountLabel,
      signUpButtonText,
      inputAttributes,
    };
  },
});
</script>
