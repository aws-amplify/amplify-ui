import { useAmplify, useAuth } from "@aws-amplify/ui-react";

export function SignIn() {
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
    },
  } = useAmplify("Authenticator.SignIn");

  const [state, send] = useAuth();
  const isPending = state.matches("signIn.pending");

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-signin=""
      method="post"
      onSubmit={event => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: "SUBMIT",
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Heading level={1}>Sign in to your account</Heading>

      <Fieldset disabled={isPending}>
        <Label data-amplify-username>
          <Text>Username</Text>
          <Input name="username" required type="text" />
        </Label>

        <Label data-amplify-password>
          <Text>Password</Text>
          <Input name="password" required type="password" />
          <Box>
            <Text>Forgot your password?</Text>{" "}
            <Button type="button">Reset Password</Button>
          </Box>
        </Label>
      </Fieldset>

      <Footer>
        <Text>No account?</Text>{" "}
        <Button onClick={() => send({ type: "SIGN_UP" })} type="button">
          Create account
        </Button>
        <Spacer />
        <Button disabled={isPending} type="submit">
          {isPending ? <>Signing in&hellip;</> : <>Sign In</>}
        </Button>
      </Footer>
    </Form>
  );
}
