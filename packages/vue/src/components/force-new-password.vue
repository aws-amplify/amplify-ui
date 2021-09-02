<template>
  <slot name="forceNewPasswordI">
    <base-wrapper data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-forcenewpassword
        @submit.prevent="onForceNewPasswordSubmit"
      >
        <base-heading>
          {{ changePasswordLabel }}
        </base-heading>
        <base-field-set
          :disabled="!actorState.matches('forceNewPassword.edit')"
        >
          <base-label data-amplify-forcenewpassword-label>
            <base-text>{{ changePasswordLabel }}</base-text>
            <base-input
              autocomplete="password"
              name="password"
              :placeholder="passwordText"
              required
              type="password"
            ></base-input>
          </base-label>
        </base-field-set>
        <base-box data-ui-error class="forceNewPasswordErrorText">
          {{ actorState.context.remoteError }}
        </base-box>
        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onHaveAccountClicked="onHaveAccountClicked"
              :onForceNewPasswordSubmit="onForceNewPasswordSubmit"
            >
            </slot>
          </template>
          <slot name="footer-left" :onHaveAccountClicked="onHaveAccountClicked">
            <base-text>{{ haveAccountLabel }}</base-text>
            <base-button type="button" @click.prevent="onHaveAccountClicked">
              {{ signInButtonText }}</base-button
            >
          </slot>
          <base-spacer />
          <slot
            name="footer-right"
            :onForceNewPasswordSubmit="onForceNewPasswordSubmit"
          >
            <base-button :disabled="actorState.matches('signUp.submit')">{{
              !actorState.matches('forceNewPassword.edit')
                ? changingPasswordLabel + '&hellip;'
                : changePasswordLabel
            }}</base-button>
          </slot>
        </base-footer>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { I18n } from 'aws-amplify';

import { SetupEventContext, ForceNewPasswordReturnTypes } from '../types';

import BaseInput from './primitives/base-input.vue';
import BaseText from './primitives/base-text.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseForm from './primitives/base-form.vue';
import BaseHeading from './primitives/base-heading.vue';
import BaseFieldSet from './primitives/base-field-set.vue';
import BaseFooter from './primitives/base-footer.vue';
import BaseButton from './primitives/base-button.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseWrapper from './primitives/base-wrapper.vue';
import BaseBox from './primitives/base-box.vue';

import { useAuth } from '../composables/useAuth';

import {
  CHANGE_PASSWORD_LABEL,
  CHANGING_PASSWORD_LABEL,
  HAVE_ACCOUNT_LABEL,
  SIGN_IN_BUTTON_TEXT,
  PASSWORD_TEXT,
} from '../defaults/DefaultTexts';
import { getActorState, SignInState } from '@aws-amplify/ui';

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
    BaseForm,
    BaseHeading,
    BaseFieldSet,
    BaseFooter,
    BaseButton,
    BaseSpacer,
    BaseWrapper,
    BaseBox,
  },
  inheritAttrs: false,
  setup(_, { emit, attrs }: SetupEventContext): ForceNewPasswordReturnTypes {
    const { state, send } = useAuth();
    const actorState: ComputedRef<SignInState> = computed(() =>
      getActorState(state.value)
    );

    // computed properties
    const changePasswordLabel = computed(() => I18n.get(CHANGE_PASSWORD_LABEL));
    const changingPasswordLabel = computed(() =>
      I18n.get(CHANGING_PASSWORD_LABEL)
    );
    const haveAccountLabel = computed(() => I18n.get(HAVE_ACCOUNT_LABEL));
    const signInButtonText = computed(() => I18n.get(SIGN_IN_BUTTON_TEXT));
    const passwordText = computed(() => I18n.get(PASSWORD_TEXT));
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

    const onForceNewPasswordSubmit = (e: Event): void => {
      if (attrs?.onForceNewPasswordSubmit) {
        emit('forceNewPasswordSubmit', e);
      } else {
        submit(e);
      }
    };

    const submit = (e: Event): void => {
      const formData = new FormData(<HTMLFormElement>e.target);
      send({
        type: 'SUBMIT',
        //@ts-ignore
        data: {
          //@ts-ignore
          ...Object.fromEntries(formData),
        },
      });
    };

    return {
      changePasswordLabel,
      submit,
      onForceNewPasswordSubmit,
      actorState,
      onHaveAccountClicked,
      signInButtonText,
      passwordText,
      haveAccountLabel,
      changingPasswordLabel,
    };
  },
});
</script>
