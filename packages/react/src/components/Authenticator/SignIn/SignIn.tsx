import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, Form, Heading, PasswordField, View } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';

export function SignIn() {
  const {
    components: {
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
    isPending,
    submitForm,
    updateForm,
  } = useAuthenticator();

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
    <View>
      <Header />

      <Form
        data-amplify-authenticator-signin=""
        method="post"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <FederatedSignIn />
        <Flex direction="column">
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
            borderRadius={0}
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
        </Flex>
      </Form>

      <Footer />
    </View>
  );
}

SignIn.Header = (): JSX.Element => null;
SignIn.Footer = () => {
  const { toResetPassword } = useAuthenticator();

  return (
    <View textAlign="center">
      <Button
        fontWeight="normal"
        onClick={toResetPassword}
        size="small"
        variation="link"
      >
        {translate('Forgot your password? ')}
      </Button>
    </View>
  );
};
