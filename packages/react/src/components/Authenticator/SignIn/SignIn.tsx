import { I18n } from 'aws-amplify';
import { getActorState, SignInState } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';

export function SignIn() {
  const amplifyNamespace = 'Authenticator.SignIn';
  const {
    components: { Button, Flex, Form, Heading, PasswordField },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const isPending = actorState.matches('signIn.pending');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

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
      onChange={handleChange}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Sign in to your account')}</Heading>

        <Flex direction="column">
          <UserNameAlias data-amplify-usernamealias />
          <PasswordField
            data-amplify-password
            className="password-field"
            placeholder={I18n.get('Password')}
            required
            name="password"
            label={I18n.get('Password')}
            autoComplete="current-password"
          />
        </Flex>

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />

        <Button
          borderRadius={0}
          isDisabled={isPending}
          isFullWidth={true}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={I18n.get('Signing in')}
          fontWeight="normal"
        >
          {I18n.get('Sign in')}
        </Button>

        <Button
          onClick={() => send({ type: 'RESET_PASSWORD' })}
          type="button"
          variation="link"
          size="small"
          fontWeight="normal"
        >
          {I18n.get('Forgot your password? ')}
        </Button>
      </Flex>

      <FederatedSignIn />
    </Form>
  );
}
