import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Form, Flex, Heading, PasswordField, Button } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';

export function SignIn() {
  const { _send, isPending, submitForm, toResetPassword, updateForm } =
    useAuthenticator();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-signin=""
      method="post"
      onSubmit={handleSubmit}
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
            isRequired={true}
            name="password"
            label={I18n.get('Password')}
            autoComplete="current-password"
            labelHidden={true}
          />
        </Flex>

        <RemoteErrorMessage />

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
          onClick={toResetPassword}
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
