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
        <Label>
          <Text>{{ fullNameText }}</Text>
          <Input name="username" required type="text"></Input>
        </Label>
        <Label>
          <Text>{{ passwordLabel }}</Text>
          <Input name="password" required type="password"></Input>
        </Label>
        <slot name="additional-fields"></slot>
        <Label>
          <Text>{{ emailAddressLabel }}</Text>
          <Input name="email" required type="email"></Input>
        </Label>
        <Label>
          <Text>{{ phoneNumberLabel }}</Text>

          <div class="flex">
            <Select
              v-model:selectValue="phonePreFix"
              name="phone_number_prefix"
              :options="options"
              class="border"
            />
            <Input
              v-model:textValue="phoneNumber"
              name="phone_number"
              class="border phone"
              required
              type="tel"
              placeholder="(555) 555-1212"
              maxlength="14"
            ></Input>
          </div>
        </Label>
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
import { defineComponent, ref, computed } from "vue";

import Form from "./primitives/Form.vue";
import Heading from "./primitives/Heading.vue";
import Text from "./primitives/Text.vue";
import Label from "./primitives/Text.vue";
import Input from "./primitives/Input.vue";
import FieldSet from "./primitives/FieldSet.vue";
import Footer from "./primitives/Footer.vue";
import Spacer from "./primitives/Spacer.vue";
import Button from "./primitives/Button.vue";
import Select from "./primitives/Select.vue";

import {
  SIGN_IN_TEXT,
  FULL_NAME_TEXT,
  SIGN_IN_BUTTON_TEXT,
  PASSWORD_LABEL,
  EMAIL_ADDRESS_LABEL,
  PHONE_NUMBER_LABEL,
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
    Label,
    Input,
    FieldSet,
    Footer,
    Spacer,
    Button,
    Select
  },
  inheritAttrs: false,
  computed: {
    signIntoAccountText: (): string => SIGN_IN_TEXT,
    fullNameText: (): string => FULL_NAME_TEXT,
    signInButtonText: (): string => SIGN_IN_BUTTON_TEXT,
    passwordLabel: (): string => PASSWORD_LABEL,
    emailAddressLabel: (): string => EMAIL_ADDRESS_LABEL,
    phoneNumberLabel: (): string => PHONE_NUMBER_LABEL,
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
    const options = [{ value: "+1" }, { value: "+7" }, { value: "+20" }];

    const phonePreFix = ref(options[0].value);
    const phoneNumber = ref("");

    const phone = computed(() => `${phonePreFix.value}${phoneNumber.value}`);

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
      options,
      onHaveAccountClicked,
      onSignUpSubmit,
      state,
      phonePreFix,
      phoneNumber
    };
  }
});
</script>

<style scoped>
.phone {
  margin-top: 0;
  border-radius: 0;
}
</style>
