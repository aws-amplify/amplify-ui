import { I18n } from 'aws-amplify';
import { getActorState, SignInState } from '@aws-amplify/ui';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';

export function SignIn() {
  const amplifyNamespace = 'Authenticator.SignIn';
  const {
    components: {
      Button,
      Divider,
      FieldGroup,
      Flex,
      Footer,
      Form,
      Heading,
      PasswordField,
      Text,
    },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
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

        <Footer>
          <Text>{I18n.get('No account? ')}</Text>
          <Button
            onClick={() => send({ type: 'SIGN_UP' })}
            type="button"
            variation="link"
            fontWeight="normal"
          >
            {I18n.get('Create account')}
          </Button>
        </Footer>
      </Flex>

      <Divider size="small" />

      <FederatedSignIn />
    </Form>
  );
}
