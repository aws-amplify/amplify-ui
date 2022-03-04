import { translate, hasTranslation, getActorState } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, PasswordField, View } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage, UserNameAlias } from '../shared';
import {
  getFormDataFromEvent,
  isInputElement,
  isInputOrSelectElement,
} from '../../../helpers/utils';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { propsCreator } from '../../../helpers/utils';

export function SignIn() {
  const { isPending, submitForm, updateForm, _state } = useAuthenticator();
  const {
    components: {
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
  } = useCustomComponents();

  const formOverrides = getActorState(_state).context?.formFields?.signIn;
  const userOverrides = formOverrides?.['username'];

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
    submitForm(getFormDataFromEvent(event));
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
          <fieldset
            style={{ display: 'flex', flexDirection: 'column' }}
            className="amplify-flex"
            disabled={isPending}
          >
            <UserNameAlias
              labelHidden={userOverrides?.labelHidden}
              placeholder={userOverrides?.placeholder}
              required={userOverrides?.required}
              label={userOverrides?.label}
              dialCode={userOverrides?.dialCode}
              dialCodeList={userOverrides?.dialCodeList}
              data-amplify-usernamealias
            />
            <PasswordField
              data-amplify-password
              className="password-field"
              {...propsCreator('password', 'Password', formOverrides, true)}
              name="password"
              autoComplete="current-password"
            />
          </fieldset>

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toResetPassword } = useAuthenticator();

  // Support backwards compatibility for legacy key with trailing space
  const forgotPasswordText = !hasTranslation('Forgot your password? ')
    ? translate('Forgot your password?')
    : translate('Forgot your password? ');

  return (
    <View data-amplify-footer="">
      <Button
        fontWeight="normal"
        onClick={toResetPassword}
        size="small"
        variation="link"
      >
        {forgotPasswordText}
      </Button>
    </View>
  );
};
