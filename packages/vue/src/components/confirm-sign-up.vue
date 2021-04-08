<template>
  <slot name="confirmSignUpSlotI">
    <base-form @submit.prevent="onConfirmSignUpSubmit">
      <base-heading>
        {{ confirmSignUpHeading }}
      </base-heading>
      <base-field-set>
        <sign-up-username-control
          :userName="state?.context?.user?.user?.username"
          :disabled="true"
        />
        <base-label data-amplify-password>
          <base-text>{{ confirmationCodeText }}</base-text>
          <base-input name="code" required type="number"></base-input>
          <base-box>
            <base-text> {{ lostYourCodeText }}</base-text>
            <base-button type="button" @click.prevent="onLostCodeClicked">
              {{ resendCodeText }}
            </base-button>
          </base-box>
        </base-label>
      </base-field-set>

      <base-footer>
        <template #footert="{ slotData }">
          <slot
            name="footer"
            :info="slotData"
            :onBackToSignInClicked="onBackToSignInClicked"
            :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
          >
          </slot>
        </template>
        <base-button type="button" @click.prevent="onBackToSignInClicked">
          {{ backSignInText }}</base-button
        >
        <base-spacer />
        <base-button>{{ confirmText }}</base-button>
      </base-footer>
    </base-form>
  </slot>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BaseHeading from "./primitives/base-heading.vue";
import BaseFieldSet from "./primitives/base-field-set.vue";
import SignUpUsernameControl from "./sign-up-username-control.vue";
import BaseLabel from "./primitives/base-label.vue";

import BaseSpacer from "./primitives/base-spacer.vue";
import BaseButton from "./primitives/base-button.vue";
import BaseFooter from "./primitives/base-footer.vue";
import BaseText from "./primitives/base-text.vue";
import BaseInput from "./primitives/base-input.vue";
import BaseForm from "./primitives/base-form.vue";
import BaseBox from "./primitives/base-box.vue";

import {
  CONFIRM_SIGNUP_HEADING,
  CONFIRMATION_CODE_TEXT,
  LOST_YOUR_CODE_TEXT,
  RESEND_CODE_TEXT,
  BACK_SIGN_IN_TEXT,
  CONFIRM_TEXT
} from "../defaults/DefaultTexts";
import { useAuth } from "../composables/useAuth";

export default defineComponent({
  components: {
    BaseBox,
    BaseHeading,
    BaseFieldSet,
    BaseForm,
    SignUpUsernameControl,
    BaseLabel,
    BaseSpacer,
    BaseButton,
    BaseFooter,
    BaseText,
    BaseInput
  },
  inheritAttrs: false,
  setup(
    _,
    {
      emit,
      attrs
    }: { emit: (st, e?) => unknown; attrs: Record<string, unknown> }
  ) {
    const { state, send } = useAuth();

    //computed properties

    const confirmSignUpHeading = computed(() => CONFIRM_SIGNUP_HEADING);
    const confirmationCodeText = computed(() => CONFIRMATION_CODE_TEXT);
    const lostYourCodeText = computed(() => LOST_YOUR_CODE_TEXT);
    const resendCodeText = computed(() => RESEND_CODE_TEXT);
    const backSignInText = computed(() => BACK_SIGN_IN_TEXT);
    const confirmText = computed(() => CONFIRM_TEXT);

    // Methods
    const onConfirmSignUpSubmit = (e): void => {
      if (attrs?.onConfirmSignUpSubmit) {
        emit("confirmSignUpSubmit", e);
      } else {
        submit(e);
      }
    };

    const submit = (e): void => {
      const formData = new FormData(e.target);
      send({
        type: "SUBMIT",
        //@ts-ignore
        data: {
          //@ts-ignore
          ...Object.fromEntries(formData),
          username: state?.value.context?.user?.user?.username
        }
      });
    };

    const onLostCodeClicked = (): void => {
      // do something
      if (attrs?.onLostCodeClicked) {
        emit("lostCodeClicked");
      } else {
        send({
          type: "RESEND",
          // @ts-ignore
          data: { username: state?.value?.context?.user?.user?.username }
        });
      }
    };

    const onBackToSignInClicked = (): void => {
      if (attrs?.onBackToSignInClicked) {
        emit("backToSignInClicked");
      } else {
        send({
          type: "SIGN_IN"
        });
      }
    };

    return {
      onConfirmSignUpSubmit,
      onBackToSignInClicked,
      submit,
      confirmSignUpHeading,
      confirmationCodeText,
      lostYourCodeText,
      resendCodeText,
      backSignInText,
      confirmText,
      onLostCodeClicked,
      state,
      send
    };
  }
});
</script>

<style scoped></style>
