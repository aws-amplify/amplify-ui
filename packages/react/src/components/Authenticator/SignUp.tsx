import { useAmplify, useAuth } from "@aws-amplify/ui-react";

export function SignUp() {
  const {
    components: { Button, Fieldset, Footer, Form, Heading, Spacer, Text },
  } = useAmplify("Authenticator.SignUp");

  const [state, send] = useAuth();
  const isPending = state.matches("signUp.pending");

  return (
    <Form
      data-amplify-authenticator-signup=""
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
      <Heading>Create a new account</Heading>

      <Fieldset>
        <SignUp.UsernameControl />
        <SignUp.PasswordControl />
        <SignUp.EmailControl />
        <SignUp.PhoneControl />
      </Fieldset>

      <Footer>
        <Text>Have an account?</Text>{" "}
        <Button onClick={() => send({ type: "SIGN_IN" })} type="button">
          Sign in
        </Button>
        <Spacer />
        <Button disabled={isPending} type="submit">
          {isPending ? <>Creating account&hellip;</> : <>Create account</>}
        </Button>
      </Footer>
    </Form>
  );
}

SignUp.UsernameControl = ({ label = "Username", name = "username" }) => {
  const {
    components: { Input, Label, Text },
  } = useAmplify("Authenticator.SignUp.Username");

  return (
    <Label data-amplify-username>
      <Text>{label}</Text>
      <Input name={name} required type="text" />
    </Label>
  );
};

SignUp.PasswordControl = ({ label = "Password", name = "password" }) => {
  const {
    components: { Input, Label, Text },
  } = useAmplify("Authenticator.SignUp.Password");

  return (
    <Label>
      <Text>{label}</Text>
      <Input name={name} required type="password" />
    </Label>
  );
};

SignUp.EmailControl = ({ label = "Email address", name = "email" }) => {
  const {
    components: { Input, Label, Text },
  } = useAmplify("Authenticator.SignUp.Password");

  return (
    <Label>
      <Text>{label}</Text>
      <Input name={name} type="email" />
    </Label>
  );
};

SignUp.PhoneControl = ({ label = "Phone number", name = "phone_number" }) => {
  const {
    components: { Input, Label, Text },
  } = useAmplify("Authenticator.SignUp.Password");

  return (
    <Label>
      <Text>{label}</Text>
      <Input name={name} type="tel" />
    </Label>
  );
};
