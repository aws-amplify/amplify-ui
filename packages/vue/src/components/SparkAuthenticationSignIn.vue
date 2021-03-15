<template>
  <div :data-spark-authenticator="this.defaults ? '' : null">
    <slot>
      <Wrapper :category="'Authenticator'" :defaultWrapper="defaultWrapper">
        <Form>
          <template #formt="{ slotData }">
            <slot name="form" :info="slotData"> </slot>
          </template>
          <Heading :level="1">
            {{ signIntoAccountText }}
          </Heading>

          <FieldSet>
            <Label>
              <Text>
                <template #textI>
                  <slot name="fullName"></slot>
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
                <Button>Reset Password</Button>
              </Box>
            </Label>
          </FieldSet>

          <Footer>
            <Text>No account?</Text>
            <Button>Create account</Button>
            <Spacer />
            <Button type="submit" @click.prevent="pressedSignIn">
              Sign In
            </Button>
          </Footer>
        </Form>
      </Wrapper>
    </slot>
  </div>
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
    defaults: {
      type: Boolean,
      default: false,
    },
    fullNameText: {
      type: String,
      default: FULL_NAME_TEXT,
    },
  },
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
  methods: {},
  emits: {
    onSignInPressed() {
      return true;
    },
  },
  computed: {
    defaultWrapper(): boolean {
      return this.defaults;
    },
  },
  setup(
    props: { signIntoAccount: string; defaults: boolean; fullNameText: string },
    { emit }
  ) {
    const pressedSignIn = (): void => {
      emit("onSignInPressed");
      console.log("normal event Auth Signin", props.defaults);
    };

    return { pressedSignIn, AUTHENTICATOR };
  },
};
</script>

<style lang="scss" scoped></style>
