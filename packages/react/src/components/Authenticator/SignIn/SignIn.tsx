import { I18n } from '@aws-amplify/core';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';
import { UserNameAlias } from '../shared';

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
  } = useAmplify('Authenticator.SignIn');

  const [state, send] = useAuth();
  const isPending = state.matches('signIn.pending');

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-signin=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Heading level={1}>{I18n.get('Sign in to your account')}</Heading>

      <FederatedSignIn />

      <Fieldset disabled={isPending}>
        <UserNameAlias data-amplify-usernamealias />

        <Label data-amplify-password>
          <Text>{I18n.get('Password')}</Text>
          <Input name="password" required type="password" />
          <Box>
            <Text>{I18n.get('Forgot your password? ')}</Text>
            <Button
              onClick={() => send({ type: 'RESET_PASSWORD' })}
              type="button"
            >
              {I18n.get('Reset password')}
            </Button>
          </Box>
        </Label>
      </Fieldset>

      <Footer>
        <Text>{I18n.get('No account? ')}</Text>
        <Button onClick={() => send({ type: 'SIGN_UP' })} type="button">
          {I18n.get('Create account')}
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? (
            <>{I18n.get('Signing in')}&hellip;</>
          ) : (
            <>{I18n.get('Sign in')}</>
          )}
        </Button>
      </Footer>
      <Box data-amplify-error>{state.event.data?.message}</Box>
    </Form>
  );
}
