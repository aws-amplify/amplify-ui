import {
  getActorContext,
  getAliasInfoFromContext,
  SignInContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import {
  Button,
  Flex,
  PasswordField,
  PhoneNumberField,
  TextField,
  View,
} from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage } from '../shared';
import { isInputElement, isInputOrSelectElement } from '../../../helpers/utils';

export function SignIn() {
  const {
    _state,
    components: {
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
    isPending,
    submitForm,
    updateForm,
  } = useAuthenticator();
  const { formValues } = getActorContext(_state) as SignInContext;
  const { error, label, type } = getAliasInfoFromContext(_state.context);

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

    const formData = new FormData(event.target as HTMLFormElement);
    const json = Object.fromEntries(formData);

    submitForm(json);
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
            {type === 'tel' ? (
              <>
                <input
                  key="username"
                  name="username"
                  readOnly
                  type="hidden"
                  value={`${formValues.country_code ?? ''}${
                    formValues.phone ?? ''
                  }`}
                />

                <PhoneNumberField
                  autoComplete="username"
                  countryCodeName="country_code"
                  defaultCountryCode={formValues.country_code}
                  errorMessage={error}
                  label={translate(label)}
                  labelHidden={true}
                  name="phone"
                  placeholder={translate(label)}
                  isRequired
                />
              </>
            ) : (
              <TextField
                autoComplete="username"
                errorMessage={error}
                label={translate(label)}
                labelHidden={true}
                name="username"
                required
                placeholder={translate(label)}
                isRequired
                type={type}
              />
            )}

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
