<template>
  <slot name="signInSlotI">
    <Wrapper>
      <Form @submit.prevent="onSignInButtonClicked">
        <template #formt="{ slotData }">
          <slot name="form" :info="slotData"> </slot>
        </template>
        <Heading :level="1">
          <template #headingI>
            <slot name="heading"></slot>
          </template>
          {{ signIntoAccountText }}
        </Heading>

        <FieldSet>
          <Label>
            <Text>
              <template #textI>
                <slot name="full-name"></slot>
              </template>
              {{ fullNameText }}
            </Text>
            <Input name="username" required type="text" />
          </Label>

          <Label>
            <Text>{{ passwordLabel }}</Text>
            <Input name="password" required type="password" />

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
          <Button type="submit" @click.prevent="onSignInButtonClicked">
            <template #buttont>
              <slot
                name="sign-in-button"
                :onSignInButtonClicked="onSignInButtonClicked"
              ></slot>
            </template>
            {{ signInButtonText }}
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
} from "../defaults/DefaultTexts";
import Footer from "./primitives/Footer.vue";
import Wrapper from "./primitives/Wrapper.vue";
import Form from "./primitives/Form.vue";
import Heading from "./primitives/Heading.vue";
import FieldSet from "./primitives/FieldSet.vue";
import Label from "./primitives/Label.vue";
import Input from "./primitives/Input.vue";
import Box from "./primitives/Box.vue";
import Button from "./primitives/Button.vue";
import Spacer from "./primitives/Spacer.vue";
import Text from "./primitives/Text.vue";
import RenderInfo from "./primitives/RenderInfo.vue";

import { inject } from "vue";

export default {
  name: "Authentication",
  computed: {
    signIntoAccountText: () => SIGN_IN_TEXT,
    fullNameText: () => FULL_NAME_TEXT,
    resetPasswordLink: () => RESET_PASSWORD_LINK,
    noAccount: () => NO_ACCOUNT,
    createAccountLink: () => CREATE_ACCOUNT_LINK,
    signInButtonText: () => SIGN_IN_BUTTON_TEXT,
    forgotYourPasswordText: () => FORGOT_YOUR_PASSWORD_TEXT,
    passwordLabel: () => PASSWORD_LABEL,
  },
  inheritAttrs: false,
  mounted() {},
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
    Spacer,
    RenderInfo,
  },
  setup(
    props: Readonly<
      {
        signIntoAccountText: string;
        fullNameText: string;
      } & {}
    >,
    { emit, attrs }
  ) {
    const pageInfo = inject("pageInfo");
    // Methods

    const onSignInButtonClicked = (): void => {
      attrs?.onSignInButtonClicked
        ? emit("signInButtonClicked")
        : console.log("normal event Auth Signin", attrs.onOnSignInPressed);
    };

    const onForgotPasswordClicked = (): void => {
      attrs?.onForgotPasswordClicked
        ? emit("forgotPasswordClicked")
        : console.log("you clicked the reset password link");
    };

    const onCreateAccountClicked = (): void => {
      attrs?.onCreateAccountClicked
        ? emit("createAccountClicked")
        : console.log("create account clicked");
      pageInfo.value = "SIGNUP";
    };

    return {
      onSignInButtonClicked,
      AUTHENTICATOR,
      onForgotPasswordClicked,
      onCreateAccountClicked,
    };
  },
};
</script>

<style lang="scss" scoped></style>
