<template>
  <slot name="signUpSlotI">
    <Form @submit.prevent="onSignUpSubmit">
      <Heading>
        <template #headingI>
          <slot name="heading"></slot>
        </template>
        {{ signUpButtonText }}
      </Heading>
      <FieldSet>
        <template #fieldSetI=" { slotData } ">
          <slot name="signup-fields" :info="slotData"> </slot>
        </template>
        <SignUpUsernameControl />
        <SignUpPasswordControl />
        <SignUpEmailControl />
        <SignUpPhoneControl v-model:phone="phone" />
      </FieldSet>

      <Footer>
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
          <Text>{{ haveAccountLabel }}</Text>
          <Button type="button" @click.prevent="onHaveAccountClicked">
            {{ signInButtonText }}</Button
          >
        </slot>
        <Spacer />
        <slot name="footer-right" :onSignUpSubmit="onSignUpSubmit">
          <Button>{{ createAccountLabel }}</Button>
        </slot>
      </Footer>
    </Form>
  </slot>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Form from "./primitives/Form.vue";
import Heading from "./primitives/Heading.vue";
import Text from "./primitives/Text.vue";
import FieldSet from "./primitives/FieldSet.vue";
import Footer from "./primitives/Footer.vue";
import Spacer from "./primitives/Spacer.vue";
import Button from "./primitives/Button.vue";
import SignUpEmailControl from "./SignUpEmailControl.vue";
import SignUpPasswordControl from "./SignUpPasswordControl.vue";
import SignUpPhoneControl from "./SignUpPhoneControl.vue";
import SignUpUsernameControl from "./SignUpUsernameControl.vue";

import {
  SIGN_IN_TEXT,
  SIGN_IN_BUTTON_TEXT,
  HAVE_ACCOUNT_LABEL,
  CREATE_ACCOUNT_LABEL,
  SIGN_UP_BUTTON_TEXT
} from "../defaults/DefaultTexts";

import { useAuth } from "../composables/useAuth";

export default defineComponent({
  components: {
    Form,
    Heading,
    Text,
    FieldSet,
    Footer,
    Spacer,
    Button,
    SignUpUsernameControl,
    SignUpPhoneControl,
    SignUpPasswordControl,
    SignUpEmailControl
  },
  inheritAttrs: false,
  computed: {
    signIntoAccountText: (): string => SIGN_IN_TEXT,
    signInButtonText: (): string => SIGN_IN_BUTTON_TEXT,
    haveAccountLabel: (): string => HAVE_ACCOUNT_LABEL,
    createAccountLabel: (): string => CREATE_ACCOUNT_LABEL,
    signUpButtonText: (): string => SIGN_UP_BUTTON_TEXT
  },
  setup(
    _,
    {
      emit,
      attrs
    }: { emit: (st, e?) => unknown; attrs: Record<string, unknown> }
  ) {
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
        const phoneS = phone.value.replace(/[^A-Z0-9+]/gi, "");

        const formData = new FormData(e.target);
        //@ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
        const values = Object.fromEntries(formData);
        delete values.phone_number_prefix;
        console.log(values);

        send({
          type: "SUBMIT",
          //@ts-ignore
          data: { ...values, phone_number: phoneS }
        });
      }
    };

    return {
      onHaveAccountClicked,
      onSignUpSubmit,
      state,
      phone
    };
  }
});
</script>

<style scoped></style>
