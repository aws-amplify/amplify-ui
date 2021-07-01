import { useAmplify, useAuth } from "@aws-amplify/ui-react";

export function ConfirmSignUp() {
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
  } = useAmplify("Authenticator.ConfirmSignUp");

  const [state, send] = useAuth();
  const isPending = state.matches("confirmSignUp.pending");

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-confirmsignup=""
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
      <Heading level={1}>Confirm Sign Up</Heading>

      <Fieldset disabled={isPending}>
        <Label data-amplify-username>
          <Text>Username</Text>
          <Input name="username" required type="text" />
        </Label>

        <Label data-amplify-confirmationcode>
          <Text>Confirmation Code</Text>
          <Input
            autoComplete="one-time-code"
            name="confirmation_code"
            placeholder="Enter your code"
            required
            type="text"
          />
          <Box>
            <Text>Lost your code?</Text>{" "}
            <Button type="button">Reset Code</Button>
          </Box>
        </Label>
      </Fieldset>

      <Footer>
        <Button onClick={() => send({ type: "SIGN_IN" })} type="button">
          Back to Sign In
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? <>Confirming&hellip;</> : <>Confirm</>}
        </Button>
      </Footer>
    </Form>
  );
}
