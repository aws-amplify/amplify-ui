<template>
  <slot name="signUpSlotI">
    <base-wrapper :data-amplify-wrapper="headless ? null : ''">
      <base-form @submit.prevent="onSignUpSubmit">
        <base-heading>
          <template #headingI>
            <slot name="heading"></slot>
          </template>
          {{ signUpButtonText }}
        </base-heading>
        <base-field-set :disabled="state.matches('signUp.submit')">
          <template #fieldSetI=" { slotData } ">
            <slot name="signup-fields" :info="slotData"> </slot>
          </template>
          <sign-in-and-up-name-control :usernameAlias="usernameAlias" />
          <sign-up-password-control />
          <sign-up-email-control />
          <sign-up-phone-control v-model:phone="phone" />
        </base-field-set>

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
          <base-spajjcer />
          <slot name="footer-right" :onSignUpSubmit="onSignUpSubmit">
            <base-button :disabled="state.matches('signUp.submit')">{{
              createAccountLabel
            }}</base-button>
          </slot>
        </base-footer>
        <base-box data-ui-error>
          {{ state.event.data?.message }}
        </base-box>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import BaseForm from "./primitives/base-form.vue";
import BaseHeading from "./primitives/base-heading.vue";
import BaseText from "./primitives/base-text.vue";
import BaseFieldSet from "./primitives/base-field-set.vue";
import BaseFooter from "./primitives/base-footer.vue";
import BaseButton from "./primitives/base-button.vue";
import SignUpEmailControl from "./sign-up-email-control.vue";
import SignUpPasswordControl from "./sign-up-password-control.vue";
import SignUpPhoneControl from "./sign-up-phone-control.vue";
import SignInAndUpNameControl from "./sign-in-and-up-name-control.vue";

import {
  SIGN_IN_BUTTON_TEXT,
  HAVE_ACCOUNT_LABEL,
  CREATE_ACCOUNT_LABEL,
  SIGN_UP_BUTTON_TEXT
} from "../defaults/DefaultTexts";

import { useAuth } from "../composables/useAuth";
import BaseWrapper from "./primitives/base-wrapper.vue";
import { SetupEventContext, SignUpSetupReturnTypes } from "../types";

export default defineComponent({
  components: {
    BaseForm,
    BaseHeading,
    BaseText,
    BaseFieldSet,
    BaseFooter,
    BaseButton,
    SignInAndUpNameControl,
    SignUpPhoneControl,
    SignUpPasswordControl,
    SignUpEmailControl,
    BaseWrapper
  },
  inheritAttrs: false,
  computed: {
    signInButtonText: (): string => SIGN_IN_BUTTON_TEXT,
    haveAccountLabel: (): string => HAVE_ACCOUNT_LABEL,
    createAccountLabel: (): string => CREATE_ACCOUNT_LABEL,
    signUpButtonText: (): string => SIGN_UP_BUTTON_TEXT
  },
  props: {
    headless: {
      default: false,
      type: Boolean
    },
    usernameAlias: {
      default: "username",
      type: String
    }
  },
  setup(_, { emit, attrs }: SetupEventContext): SignUpSetupReturnTypes {
    const { state, send } = useAuth();

    const phone = ref("");

    // Methods
    const onHaveAccountClicked = (): void => {
      if (attrs?.onHaveAccountClicked) {
        emit("haveAccountClicked");
      } else {
        send({
          type: "SIGN_IN"
        });
      }
    };

    const onSignUpSubmit = (e): void => {
      if (attrs?.onSignUpSubmit) {
        emit("signUpSubmit", e);
      } else {
        submit(e);
      }
    };

    const submit = (e): void => {
      const phoneS = phone.value.replace(/[^A-Z0-9+]/gi, "");

      const formData = new FormData(e.target);
      //@ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
      const values = Object.fromEntries(formData);
      delete values.phone_number_prefix;

      send({
        type: "SUBMIT",
        //@ts-ignore
        data: { ...values, phone_number: phoneS }
      });
    };

    return {
      onHaveAccountClicked,
      onSignUpSubmit,
      state,
      phone,
      submit
    };
  }
});
</script>

<style scoped></style>
