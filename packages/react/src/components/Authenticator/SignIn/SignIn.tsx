import * as React from 'react';

import { translate, hasTranslation } from '@aws-amplify/ui';
import classNames from 'classnames';
import { ComponentClassNames } from '../../../primitives/shared';

import { Button, Flex, View, VisuallyHidden } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';
import { RemoteErrorMessage } from '../shared';

import { FormFields } from '../shared/FormFields';

export function SignIn() {
  const { isPending } = useAuthenticator();
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
  } = useCustomComponents();

  return (
    <View>
      <Header />

      <form
        className={classNames(
          ComponentClassNames.AuthenticatorForm,
          ComponentClassNames.AuthenticatorSignIn
        )}
        data-amplify-form=""
        data-amplify-authenticator-signin=""
        method="post"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <FederatedSignIn />
        <Flex direction="column">
          <fieldset
            className={classNames(
              'amplify-flex',
              ComponentClassNames.AuthenticatorFieldSet
            )}
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
            className={ComponentClassNames.AuthenticatorSignInButton}
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
    <View
      data-amplify-footer=""
      className={ComponentClassNames.AuthenticatorFooter}
    >
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
