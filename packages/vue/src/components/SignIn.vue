<template>
  <slot name="signInSlotI">
    <Wrapper>
      <Form>
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
            <Text>Password</Text>
            <Input name="username" required type="password" />

            <Box>
              <Text> Forgot your password? </Text>
              <Button @click.prevent="onForgotPasswordClicked">
                <template #buttont>
                  <slot
                    name="forgot-password-button"
                    :onForgotPasswordClicked="onForgotPasswordClicked"
                  ></slot>
                </template>

                Reset Password
              </Button>
            </Box>
          </Label>
        </FieldSet>
        <Footer>
          <Text>No account?</Text>
          <Button>Create account</Button>
          <Spacer />
          <Button type="submit" @click.prevent="onSignInButtonClicked">
            <template #buttont>
              <slot
                name="sign-in-button"
                :onSignInButtonClicked="onSignInButtonClicked"
              ></slot>
            </template>
            Sign In
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

export default {
  name: "Authentication",
  props: {
    signIntoAccountText: {
      type: String,
      default: SIGN_IN_TEXT,
    },
    fullNameText: {
      type: String,
      default: FULL_NAME_TEXT,
    },
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
    // Methods

    const onSignInButtonClicked = (): void => {
      attrs?.onSignInButtonClicked
        ? emit("signInButtonClicked")
        : console.log("normal event Auth Signin", attrs.onOnSignInPressed);
    };

    const onForgotPasswordClicked = (): void => {
      console.log("you clicked the reset password link");
    };

    return { onSignInButtonClicked, AUTHENTICATOR, onForgotPasswordClicked };
  },
};
</script>

<style lang="scss" scoped></style>
