<template>
  <slot name="verifyUserSlotI">
    <base-wrapper data-amplify-wrapper>
      <base-form @submit.prevent="onVerifyUserSubmit">
        <base-heading>
          {{ verifyHeading }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('verifyUser.pending')">
          <base-label
            data-amplify-verify-label
            id="verify"
            v-for="(value, key) in unverifiedAttributes"
            :key="value"
          >
            <base-input
              data-amplify-verify-input
              id="verify"
              name="unverifiedAttr"
              type="radio"
              :value="key"
            >
            </base-input>
            {{ authInputAttributes[key].label }}
          </base-label>
        </base-field-set>

        <base-box data-ui-error>
          {{ actorState?.context.remoteError }}
        </base-box>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onSkipClicked="onSkipClicked"
              :onVerifyUserSubmit="onVerifyUserSubmit"
            >
            </slot>
          </template>
          <base-button type="button" @click.prevent="onSkipClicked">
            {{ skipText }}</base-button
          >
          <base-spacer />
          <base-button :disabled="actorState.matches('verifyUser.pending')">{{
            verifyText
          }}</base-button>
        </base-footer>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import BaseHeading from './primitives/base-heading.vue';
import BaseFieldSet from './primitives/base-field-set.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseButton from './primitives/base-button.vue';
import BaseFooter from './primitives/base-footer.vue';
import BaseText from './primitives/base-text.vue';
import BaseInput from './primitives/base-input.vue';
import BaseForm from './primitives/base-form.vue';
import BaseBox from './primitives/base-box.vue';
import BaseWrapper from './primitives/base-wrapper.vue';

import { useAuth } from '../composables/useAuth';

import {
  VERIFY_HEADING,
  SKIP_TEXT,
  VERIFY_TEXT,
} from '../defaults/DefaultTexts';
import { SetupEventContext, VerifyUserSetupReturnTypes } from '../types';
import {
  getActorState,
  SignInState,
  authInputAttributes,
} from '@aws-amplify/ui';

export default defineComponent({
  components: {
    BaseBox,
    BaseHeading,
    BaseFieldSet,
    BaseForm,
    BaseLabel,
    BaseSpacer,
    BaseButton,
    BaseFooter,
    BaseText,
    BaseInput,
    BaseWrapper,
  },
  inheritAttrs: false,
  setup(_, { emit, attrs }: SetupEventContext): VerifyUserSetupReturnTypes {
    const { state, send } = useAuth();
    const actorState: ComputedRef<SignInState> = computed(
      () => getActorState(state.value) as SignInState
    );

    const unverifiedAttributes = actorState.value.context.unverifiedAttributes;

    // Computed Properties
    const verifyHeading = computed(() => VERIFY_HEADING);
    const skipText = computed(() => SKIP_TEXT);
    const verifyText = computed(() => VERIFY_TEXT);

    // Methods
    const onVerifyUserSubmit = (e: Event): void => {
      if (attrs?.onVerifyUserSubmit) {
        emit('verifyUserSubmit', e);
      } else {
        submit(e);
      }
    };

    const submit = (e): void => {
      const formData = new FormData(e.target);
      send({
        type: 'SUBMIT',
        //@ts-ignore
        data: {
          //@ts-ignore
          ...Object.fromEntries(formData),
        },
      });
    };

    const onSkipClicked = (): void => {
      if (attrs?.onSkipClicked) {
        emit('skipClicked');
      } else {
        send('SKIP');
      }
    };

    return {
      onVerifyUserSubmit,
      onSkipClicked,
      submit,
      actorState,
      unverifiedAttributes,
      verifyHeading,
      skipText,
      verifyText,
      authInputAttributes,
    };
  },
});
</script>
