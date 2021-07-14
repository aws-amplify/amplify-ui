import { useAmplify, useAuth } from "@aws-amplify/ui-react";

import { UserNameAliasNames } from "../../../primitives/shared/constants";

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

  const [primaryAlias, ...secondaryAliases] = state.context.config
    ?.login_mechanisms ?? ["username", "email", "phone_number"];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: "CHANGE",
      data: { name, value },
    });
  };

  return (
    <Form
      data-amplify-authenticator-signup=""
      method="post"
      onSubmit={(event) => {
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
        <SignUp.AliasControl
          label={UserNameAliasNames[primaryAlias].name}
          name={primaryAlias}
        />
        <SignUp.PasswordControl />
        <SignUp.ConfirmPasswordControl />
        {secondaryAliases.map((alias) => (
          <SignUp.AliasControl
            key={alias}
            label={UserNameAliasNames[alias].name}
            name={alias}
          />
        ))}
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

SignUp.AliasControl = ({
  label = "Username",
  name = "username",
  placeholder = label,
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
        <Input
          name={name}
          placeholder={placeholder}
          required
          type={UserNameAliasNames[name].type}
        />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};

SignUp.PasswordControl = ({
  label = "Password",
  name = "password",
  placeholder = label,
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
        <Input name={name} placeholder={placeholder} required type="password" />
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
        <Input name={name} placeholder={label} required type="password" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};
