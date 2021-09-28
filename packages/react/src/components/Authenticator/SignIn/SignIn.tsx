import { I18n } from 'aws-amplify';
import { getActorState, SignInState } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { handleFormChange, handleFormSubmit } from '../../../utils';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';

export function SignIn() {
  const amplifyNamespace = 'Authenticator.SignIn';
  const {
    components: { Button, FieldGroup, Flex, Form, Heading, PasswordField },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const isPending = actorState.matches('signIn.pending');

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-signin=""
      method="post"
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Sign in to your account')}</Heading>

        <FieldGroup disabled={isPending} direction="column">
          <UserNameAlias data-amplify-usernamealias />
          <PasswordField
            data-amplify-password
            className="password-field"
            placeholder={I18n.get('Password')}
            required
            name="password"
            label={I18n.get('Password')}
            autoComplete="current-password"
            labelHidden={true}
          />
        </FieldGroup>

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
