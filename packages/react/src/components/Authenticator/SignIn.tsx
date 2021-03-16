import { useSpark } from "@aws-amplify/spark-react";

export function SignIn({ className }) {
  const {
    components: {
      Box,
      Button,
      Fieldset,
      Footer,
      Form,
      Heading,
      Input,
      Label,
      Spacer,
      Text,
      // @ts-ignore How to tell the context that this may exist for this scope?
      PasswordControl = SignIn.PasswordControl,
    },
  } = useSpark("Authenticator.SignIn");

  return (
    // TODO Automatically add these namespaces again from `useSpark`
    <Form data-spark-authenticator-signin="">
      <Heading level={1}>Sign in to your account</Heading>

      <Fieldset>
        <Label data-spark-username>
          <Text>Full name</Text>
          <Input name="username" required type="text" />
        </Label>

        <PasswordControl label="Password" />
      </Fieldset>

      <Footer>
        <Text>No account?</Text> <Button>Create account</Button>
        <Spacer />
        <Button type="submit">Sign In</Button>
      </Footer>
    </Form>
  );
}

SignIn.PasswordControl = ({ label }) => {
  const {
    components: { Input, Label, Text, Wrapper },
  } = useSpark("Authenticator.SignIn.Password");

  return (
    <Wrapper data-spark-signin-password>
      <Label>
        <Text>{label}</Text>
        <Input name="username" required type="password" />
        {/* TODO This hint is only needed for SignUp, not SignIn! <Box>
          <Text>Forgot your password?</Text> <Button>Reset Password</Button>
        </Box> */}
      </Label>
    </Wrapper>
  );
};
