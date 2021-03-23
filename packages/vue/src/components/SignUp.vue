<template>
  <Form @submit.prevent="onCreateAccountButtonClicked">
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
        <Input name="Email" required type="text"></Input>
      </Label>
      <Label>
        <Text>Phone Number</Text>

        <div class="flex">
          <Select
            name="country-dial-code-select"
            :options="options"
            class="border"
          />
          <Input name="Email" class="border phone" required type="text"></Input>
        </div>
      </Label>
    </FieldSet>

    <Footer>
      <Text>Have an account?</Text
      ><Button @click.prevent="onHaveAccountClicked"> Sign in</Button>
      <Spacer />
      <Button type="submit">CREATE ACCOUNT</Button>
    </Footer>
  </Form>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from "vue";

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
    Select,
  },
  setup() {
    const pageInfo = inject<Ref<string>>("pageInfo");
    const options = [{ value: "+1" }, { value: "+7" }, { value: "+20" }];

    // Methods
    const onHaveAccountClicked = (): void => {
      pageInfo.value = "SIGNIN";
    };

    const onCreateAccountButtonClicked = (): void => {
      console.log("create account button clicked");
    };

    return { options, onHaveAccountClicked, onCreateAccountButtonClicked };
  },
});
</script>

<style scoped>
.phone {
  margin-top: 0;
  border-radius: 0;
}
</style>
