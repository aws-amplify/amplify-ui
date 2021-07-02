import { useAmplify, useAuth } from "@aws-amplify/ui-react";
import { UserNameAlias } from "./UserNameAlias";

export function SignUp() {
  const {
    components: {
      Button,
      Fieldset,
      Footer,
      Form,
      Heading,
      Spacer,
      Text,
      ErrorText,
    },
  } = useAmplify("Authenticator.SignUp");

  const [state, send] = useAuth();
  const isPending = state.matches("signUp.pending");
  const { remoteError } = state.context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: "CHANGE",
      // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
      data: { name, value },
    });
  };

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
      onChange={handleChange}
    >
      <Heading>Create a new account</Heading>

      <Fieldset>
        <SignUp.UsernameControl />
        <SignUp.PasswordControl />
        <SignUp.ConfirmPasswordControl />
        <SignUp.EmailControl />
        <SignUp.PhoneControl />
      </Fieldset>

      <ErrorText>{remoteError}</ErrorText>

      <Footer>
        <Text>Have an account?</Text>{" "}
        <Button onClick={() => send({ type: "SIGN_IN" })} type="button">
          Sign in
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? <>Creating Account&hellip;</> : <>Create Account</>}
        </Button>
      </Footer>
    </Form>
  );
}

SignUp.UsernameControl = ({ label = "Username", name = "username" }) => {
  return <UserNameAlias data-amplify-usernamealias />;
};

SignUp.PasswordControl = ({ label = "Password", name = "password" }) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify("Authenticator.SignUp.Password");
  const [{ context }] = useAuth();
  const error = context.validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input name={name} required type="password" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};

SignUp.ConfirmPasswordControl = ({
  label = "Confirm Password",
  name = "confirm_password",
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify("Authenticator.SignUp.Password");
  const [{ context }] = useAuth();
  const error = context.validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input name={name} required type="password" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};

SignUp.EmailControl = ({ label = "Email address", name = "email" }) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify("Authenticator.SignUp.Password");
  const [{ context }] = useAuth();
  const error = context.validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input name={name} type="email" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};

SignUp.PhoneControl = ({ label = "Phone number", name = "phone_number" }) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify("Authenticator.SignUp.Password");
  const [{ context }] = useAuth();
  const error = context.validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input name={name} type="tel" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};
