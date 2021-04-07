<template>
  <slot name="confirmSignUpSlotI">
    <Form @submit.prevent="onConfirmSignUpSubmit">
      <Heading>
        {{ confirmSignUpHeading }}
      </Heading>
      <FieldSet>
        <SignUpUsernameControl
          :userName="state?.context?.user?.user?.username"
          :disabled="true"
        />
        <Label data-amplify-password>
          <Text>{{ confirmationCodeText }}</Text>
          <Input name="code" required type="number"></Input>
          <Box>
            <Text> {{ lostYourCodeText }}</Text>
            <Button type="button" @click.prevent="onLostCodeClicked">
              {{ resendCodeText }}
            </Button>
          </Box>
        </Label>
      </FieldSet>

      <Footer>
        <Button type="button" @click.prevent="onBackToSignInClicked">
          {{ backSignInText }}</Button
        >
        <Spacer />
        <Button>{{ confirmText }}</Button>
      </Footer>
    </Form>
  </slot>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Heading from "./primitives/Heading.vue";
import FieldSet from "./primitives/FieldSet.vue";
import SignUpUsernameControl from "./SignUpUsernameControl.vue";
import Label from "./primitives/Label.vue";

import Spacer from "./primitives/Spacer.vue";
import Button from "./primitives/Button.vue";
import Footer from "./primitives/Footer.vue";
import Text from "./primitives/Text.vue";
import Input from "./primitives/Input.vue";
import Form from "./primitives/Form.vue";
import Box from "./primitives/Box.vue";

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
    Box,
    Heading,
    FieldSet,
    Form,
    SignUpUsernameControl,
    Label,
    Spacer,
    Button,
    Footer,
    Text,
    Input
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
        emit("confirmSignUpSubmit");
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
