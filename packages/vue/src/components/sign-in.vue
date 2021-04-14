<template>
  <slot name="signInSlotI">
    <base-wrapper>
      <base-form @submit.prevent="onSignInSubmit" method="post">
        <template #formt="{ slotData }">
          <slot name="form" :info="slotData"> </slot>
        </template>
        <base-heading :level="1">
          <template #headingI>
            <slot name="heading"></slot>
          </template>
          {{ signIntoAccountText }}
        </base-heading>

        <base-field-Set :disabled="state.matches('signIn.pending')">
          <base-label>
            <base-text>
              <template #textI>
                <slot name="full-name"></slot>
              </template>
              {{ fullNameText }}
            </base-text>
            <base-input name="username" required type="text" />
          </base-label>

          <base-label data-amplify-password>
            <base-text>{{ passwordLabel }}</base-text>
            <base-input name="password" required type="password" />
            <slot
              name="additional-fields"
              :onSignInSubmit="onSignInSubmit"
              :onCreateAccountClicked="onCreateAccountClicked"
            ></slot>

            <base-box>
              <base-text> {{ forgotYourPasswordText }}</base-text>
              <base-button
                type="button"
                @click.prevent="onForgotPasswordClicked"
              >
                <template #buttont>
                  <slot
                    name="forgot-password-button"
                    :onForgotPasswordClicked="onForgotPasswordClicked"
                  ></slot>
                </template>

                {{ resetPasswordLink }}
              </base-button>
            </base-box>
          </base-label>
        </base-field-Set>
        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onSignInSubmit="onSignInSubmit"
              :onCreateAccountClicked="onCreateAccountClicked"
            >
            </slot>
          </template>
          <base-text>{{ noAccount }}</base-text>
          <base-button type="button" @click.prevent="onCreateAccountClicked">{{
            createAccountLink
          }}</base-button>
          <base-spacer />
          <base-button :disabled="state.matches('signIn.pending')">
            <template #buttont>
              <slot
                name="sign-in-button"
                :onSignInSubmit="onSignInSubmit"
              ></slot>
            </template>
            {{
              state.matches("signIn.pending")
                ? signIngButtonText
                : signInButtonText
            }}
            <!-- Add prop too? -->
          </base-button>
        </base-footer>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import {
  SIGN_IN_TEXT,
  FULL_NAME_TEXT,
  AUTHENTICATOR,
  RESET_PASSWORD_LINK,
  NO_ACCOUNT,
  CREATE_ACCOUNT_LINK,
  SIGN_IN_BUTTON_TEXT,
  FORGOT_YOUR_PASSWORD_TEXT,
  PASSWORD_LABEL,
  SIGNING_IN_BUTTON_TEXT
} from "../defaults/DefaultTexts";

import BaseLabel from "./primitives/base-label.vue";
import BaseFooter from "./primitives/base-footer.vue";
import BaseWrapper from "./primitives/base-wrapper.vue";
import BaseForm from "./primitives/base-form.vue";
import BaseHeading from "./primitives/base-heading.vue";
import BaseFieldSet from "./primitives/base-field-set.vue";
import BaseInput from "./primitives/base-input.vue";
import BaseBox from "./primitives/base-box.vue";
import BaseButton from "./primitives/base-button.vue";
import BaseSpacer from "./primitives/base-spacer.vue";
import BaseText from "./primitives/base-text.vue";

// @xstate
import { useAuth } from "../composables/useAuth";

import { Ref, ref } from "vue";

export default {
  name: "Authentication",
  computed: {
    signIntoAccountText: (): string => SIGN_IN_TEXT,
    fullNameText: (): string => FULL_NAME_TEXT,
    resetPasswordLink: (): string => RESET_PASSWORD_LINK,
    noAccount: (): string => NO_ACCOUNT,
    createAccountLink: (): string => CREATE_ACCOUNT_LINK,
    signInButtonText: (): string => SIGN_IN_BUTTON_TEXT,
    signIngButtonText: (): string => SIGNING_IN_BUTTON_TEXT,
    forgotYourPasswordText: (): string => FORGOT_YOUR_PASSWORD_TEXT,
    passwordLabel: (): string => PASSWORD_LABEL
  },
  inheritAttrs: false,
  components: {
    BaseFooter,
    BaseWrapper,
    BaseForm,
    BaseHeading,
    BaseFieldSet,
    BaseLabel,
    BaseText,
    BaseInput,
    BaseBox,
    BaseButton,
    BaseSpacer
  },
  setup(
    props: Readonly<
      {
        signIntoAccountText: string;
        fullNameText: string;
      } & unknown
    >,
    {
      emit,
      attrs
    }: { emit: (st, e?) => unknown; attrs: Record<string, unknown> }
  ): Record<string, unknown> {
    // @Xstate Initialization

    const username: Ref = ref("");
    const password: Ref = ref("");
    const { state, send } = useAuth();

    // Methods

    const onSignInSubmit = (e): void => {
      if (attrs?.onSignInSubmit) {
        emit("signInSubmit", e);
      } else {
        submit(e);
      }
    };

    const submit = (e): void => {
      console.log("normal event Auth Signin", attrs.onOnSignInPressed);
      const formData = new FormData(e.target);
      send({
        type: "SUBMIT",
        // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
        data: Object.fromEntries(formData)
      });
    };

    const onForgotPasswordClicked = (): void => {
      if (attrs?.onForgotPasswordClicked) {
        emit("forgotPasswordClicked");
      } else {
        console.log("you clicked the reset password link");
      }
    };

    const onCreateAccountClicked = (): void => {
      if (attrs?.onCreateAccountClicked) {
        emit("createAccountClicked");
      } else {
        console.log("create account clicked");
        send({
          type: "SIGN_UP"
        });
      }
    };

    return {
      onSignInSubmit,
      AUTHENTICATOR,
      onForgotPasswordClicked,
      onCreateAccountClicked,
      state,
      username,
      password,
      submit
    };
  }
};
</script>

<style lang="scss" scoped></style>
