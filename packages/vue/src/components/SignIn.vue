<template>
  <slot name="signInSlotI">
    <Wrapper>
      <Form @submit.prevent="onSignInButtonClicked" method="post">
        <template #formt="{ slotData }">
          <slot name="form" :info="slotData"> </slot>
        </template>
        <Heading :level="1">
          <template #headingI>
            <slot name="heading"></slot>
          </template>
          {{ signIntoAccountText }}
        </Heading>

        <FieldSet :disabled="state.matches('signIn.pending')">
          <Label>
            <Text>
              <template #textI>
                <slot name="full-name"></slot>
              </template>
              {{ fullNameText }}
            </Text>
            <Input name="username" required type="text" />
          </Label>

          <Label data-amplify-password>
            <Text>{{ passwordLabel }}</Text>
            <Input name="password" required type="password" />
            <slot
              name="additional-fields"
              :onSignInButtonClicked="onSignInButtonClicked"
              :onCreateAccountClicked="onCreateAccountClicked"
            ></slot>

            <Box>
              <Text> {{ forgotYourPasswordText }}</Text>
              <Button type="button" @click.prevent="onForgotPasswordClicked">
                <template #buttont>
                  <slot
                    name="forgot-password-button"
                    :onForgotPasswordClicked="onForgotPasswordClicked"
                  ></slot>
                </template>

                {{ resetPasswordLink }}
              </Button>
            </Box>
          </Label>
        </FieldSet>
        <Footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onSignInButtonClicked="onSignInButtonClicked"
              :onCreateAccountClicked="onCreateAccountClicked"
            >
            </slot>
          </template>
          <Text>{{ noAccount }}</Text>
          <Button type="button" @click.prevent="onCreateAccountClicked">{{
            createAccountLink
          }}</Button>
          <Spacer />
          <Button :disabled="state.matches('signIn.pending')">
            <template #buttont>
              <slot
                name="sign-in-button"
                :onSignInButtonClicked="onSignInButtonClicked"
              ></slot>
            </template>
            {{
              state.matches('signIn.pending')
                ? signIngButtonText
                : signInButtonText
            }}
            <!-- Add prop too? -->
          </Button>
        </Footer>
      </Form>
    </Wrapper>
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
} from '../defaults/DefaultTexts';
import Footer from './primitives/Footer.vue';
import Wrapper from './primitives/Wrapper.vue';
import Form from './primitives/Form.vue';
import Heading from './primitives/Heading.vue';
import FieldSet from './primitives/FieldSet.vue';
import Label from './primitives/Label.vue';
import Input from './primitives/Input.vue';
import Box from './primitives/Box.vue';
import Button from './primitives/Button.vue';
import Spacer from './primitives/Spacer.vue';
import Text from './primitives/Text.vue';

// @xstate
import { useAuth } from '../composables/useAuth';

import { Ref, ref } from 'vue';

export default {
  name: 'Authentication',
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
    Footer,
    Wrapper,
    Form,
    Heading,
    FieldSet,
    Label,
    Text,
    Input,
    Box,
    Button,
    Spacer
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

    const username: Ref = ref('');
    const password: Ref = ref('');
    const { state, send } = useAuth();

    // Methods

    const onSignInButtonClicked = (e): void => {
      if (attrs?.onSignInButtonClicked) {
        emit('signInButtonClicked', e);
      } else {
        console.log('normal event Auth Signin', attrs.onOnSignInPressed);
        const formData = new FormData(e.target);
        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData)
        });
      }
    };

    const onForgotPasswordClicked = (): void => {
      if (attrs?.onForgotPasswordClicked) {
        emit('forgotPasswordClicked');
      } else {
        console.log('you clicked the reset password link');
      }
    };

    const onCreateAccountClicked = (): void => {
      if (attrs?.onCreateAccountClicked) {
        emit('createAccountClicked');
      } else {
        console.log('create account clicked');
        send({
          type: 'SIGN_UP'
        });
      }
    };

    return {
      onSignInButtonClicked,
      AUTHENTICATOR,
      onForgotPasswordClicked,
      onCreateAccountClicked,
      state,
      username,
      password
    };
  }
};
</script>

<style lang="scss" scoped></style>
