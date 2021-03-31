<template>
  <Form @submit.prevent="onSignUpButtonClicked">
    <Heading>
      <template #headingI>
        <slot name="heading"></slot>
      </template>
      Sign Up
    </Heading>
    <FieldSet>
      <Label>
        <Text>Username</Text>
        <Input name="username" required type="text"></Input>
      </Label>
      <Label>
        <Text>Password</Text>
        <Input name="password" required type="password"></Input>
      </Label>
      <Label>
        <Text>Email Address</Text>
        <Input name="email" required type="email"></Input>
      </Label>
      <Label>
        <Text>Phone Number</Text>

        <div class="flex">
          <Select
            v-model:selectValue="phonePreFix"
            name="phone_number"
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
      <Text>Have an account?</Text
      ><Button type="button" @click.prevent="onHaveAccountClicked">
        Sign in</Button
      >
      <Spacer />
      <Button>CREATE ACCOUNT</Button>
    </Footer>
  </Form>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, computed } from "vue";

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
  setup() {
    const { state, send } = useAuth();
    const pageInfo = inject<Ref<string>>("pageInfo");
    const options = [{ value: "+1" }, { value: "+7" }, { value: "+20" }];

    const phonePreFix = ref(options[0].value);
    const phoneNumber = ref("");

    const phone = computed(() => `${phonePreFix.value}${phoneNumber.value}`);

    // Methods
    const onHaveAccountClicked = (): void => {
      pageInfo.value = "SIGNIN";
      send({
        type: "SIGN_IN"
      });
    };

    const onSignUpButtonClicked = (e): void => {
      const phoneS = phone.value.replace(/[^A-Z0-9\+]/gi, "");
      console.log("full", phoneS);

      const formData = new FormData(e.target);

      send({
        type: "SUBMIT",
        //@ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
        data: { ...Object.fromEntries(formData), phone_number: phoneS }
      });
    };

    return {
      options,
      onHaveAccountClicked,
      onSignUpButtonClicked,
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
