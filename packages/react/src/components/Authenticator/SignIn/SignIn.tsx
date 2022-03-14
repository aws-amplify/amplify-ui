import * as React from 'react';

import { translate, hasTranslation } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, View, VisuallyHidden } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage } from '../shared';
import {
  getFormDataFromEvent,
  isInputElement,
  isInputOrSelectElement,
} from '../../../helpers/utils';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { FormFields } from '../shared/FormFields';

export function SignIn() {
  const { isPending, submitForm, updateForm, _state } = useAuthenticator();
  const {
    components: {
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
  } = useCustomComponents();

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
            <VisuallyHidden>
              <legend>{translate('Sign in')}</legend>
            </VisuallyHidden>
            <FormFields route="signIn" />
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
