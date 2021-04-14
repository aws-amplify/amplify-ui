import * as React from "react";
import tailwind from "tailwind-rn";
import { useAmplify, useAuth } from "../../hooks";

const onChangeWrapper = (callback: Function) => {
  return (e: any) => typeof callback === 'function' && callback(e.target.value);
}

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

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    send({
      type: "SUBMIT",
      data: { username, password },
    });
  }

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-signin=""
      method="post"
      onSubmit={onSubmit}
    >
      <Heading level={1}>Sign in to your account</Heading>

      <Fieldset disabled={isPending}>
        <Label data-amplify-username>
          <Text>Username</Text>
          <Input name="username" required type="text" value={username} onChange={onChangeWrapper(setUsername)} />
        </Label>

        <Label data-amplify-password>
          <Text>Password</Text>
          <Input name="password" required type="password" value={password} onChange={onChangeWrapper(setPassword)} />
          <Box>
            <Text>Forgot your password?</Text>
            <Button type="button">Reset Password</Button>
          </Box>
        </Label>
      </Fieldset>

      <Footer>
        <Text>No account?</Text>
        <Button onClick={() => send("SIGN_UP")} type="button">
          Create account
        </Button>
        <Spacer />
        {isPending ? (
          <Button
            disabled={isPending}
            type="submit"
            style={tailwind(
              "px-8 py-2 text-base text-white bg-gray-700 rounded"
            )}
          >
            Signing in&hellip;
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={isPending}
            type="submit"
            style={tailwind(
              "px-8 py-2 text-base text-white bg-gray-700 rounded"
            )}
          >
            Sign In
          </Button>
        )}
      </Footer>
    </Form>
  );
}
