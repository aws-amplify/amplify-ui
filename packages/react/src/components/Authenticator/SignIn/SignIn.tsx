import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, PasswordField, View } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';
import { isInputElement, isInputOrSelectElement } from '../../../helpers/utils';

export function SignIn() {
  const {
    components: {
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
    isPending,
    submitForm,
    updateForm,
  } = useAuthenticator();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputOrSelectElement(event.target)) {
      let { name, type, value } = event.target;
      if (
        isInputElement(event.target) &&
        type === 'checkbox' &&
        !event.target.checked
      ) {
        value = undefined;
      }

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
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
            isDisabled={isPending}
            isFullWidth={true}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={translate('Signing in')}
          >
            {translate('Sign in')}
          </Button>
        </Flex>
      </form>
      <Footer />
    </View>
  );
}

SignIn.Header = (): JSX.Element => null;
SignIn.Footer = () => {
  const { toResetPassword } = useAuthenticator();

  return (
    <View data-amplify-footer="">
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
