import { translate } from '@aws-amplify/ui';

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
        <Heading level={3}>{translate('Sign in to your account')}</Heading>

        <Flex direction="column">
          <UserNameAlias data-amplify-usernamealias />
          <PasswordField
            data-amplify-password
            className="password-field"
            placeholder={translate('Password')}
            isRequired={true}
            name="password"
            label={translate('Password')}
            autoComplete="current-password"
            labelHidden={true}
          />
        </Flex>

        <RemoteErrorMessage />

        <Button
          borderRadius="0"
          isDisabled={isPending}
          isFullWidth={true}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={translate('Signing in')}
          fontWeight="normal"
        >
          {translate('Sign in')}
        </Button>

        <Button
          onClick={toResetPassword}
          type="button"
          variation="link"
          size="small"
          fontWeight="normal"
        >
          {translate('Forgot your password? ')}
        </Button>
      </Flex>

      <FederatedSignIn />
    </Form>
  );
}
