import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { View } from '../../../primitives/View';
import { FederatedSignIn } from '../FederatedSignIn';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields as DefaultFormFields } from '../shared/FormFields';

const { getCreateAccountText, getCreatingAccountText } = authenticatorTextUtil;

export function SignUp(): React.JSX.Element {
  const {
    hasValidationErrors,
    isPending,
    availableAuthMethods,
    preferredChallenge,
    selectedAuthMethod,
    selectAuthMethod,
  } = useAuthenticator((context) => [
    context.hasValidationErrors,
    context.isPending,
    context.availableAuthMethods,
    context.preferredChallenge,
    context.selectedAuthMethod,
    context.selectAuthMethod,
  ]);
  const { handleChange, handleBlur, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SignUp: {
        Header = SignUp.Header,
        FormFields = SignUp.FormFields,
        Footer = SignUp.Footer,
      },
    },
  } = useCustomComponents();

  // Filter out WEB_AUTHN for sign-up (passkeys are sign-in only)
  const signUpMethods = availableAuthMethods?.filter((m) => m !== 'WEB_AUTHN');
  const hasMultipleMethods = signUpMethods && signUpMethods.length > 1;

  // Determine which method to show first
  const primaryMethod =
    preferredChallenge && preferredChallenge !== 'WEB_AUTHN'
      ? preferredChallenge
      : 'PASSWORD';

  // Other methods (excluding primary)
  const otherMethods = signUpMethods?.filter((m) => m !== primaryMethod) ?? [];

  // Determine if password should be shown
  const effectiveMethod = selectedAuthMethod ?? primaryMethod;
  const isPasswordless = effectiveMethod !== 'PASSWORD';

  const getButtonText = (method: string) => {
    switch (method) {
      case 'EMAIL_OTP':
        return 'Create account with Email OTP';
      case 'SMS_OTP':
        return 'Create account with SMS OTP';
      case 'PASSWORD':
        return hasMultipleMethods
          ? 'Create account with Password'
          : getCreateAccountText();
      default:
        return getCreateAccountText();
    }
  };

  const handleMethodClick = (method: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    selectAuthMethod({ method: method });
    const form = (e.target as HTMLElement).closest('form');
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signup=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <FederatedSignIn />

        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Flex direction="column">
            <FormFields includePassword={!isPasswordless} />
            <RemoteErrorMessage />
          </Flex>

          {/* Primary button */}
          <Button
            isDisabled={hasValidationErrors || isPending}
            isFullWidth
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={getCreatingAccountText()}
          >
            {getButtonText(primaryMethod)}
          </Button>

          {/* Other methods */}
          {hasMultipleMethods && otherMethods.length > 0 && (
            <>
              <Flex justifyContent="center" padding="medium 0">
                or
              </Flex>
              {otherMethods.map((method) => (
                <Button
                  key={method}
                  isDisabled={isPending}
                  isFullWidth
                  type="button"
                  variation="primary"
                  onClick={handleMethodClick(method)}
                >
                  {getButtonText(method)}
                </Button>
              ))}
            </>
          )}

          <Footer />
        </Flex>
      </form>
    </View>
  );
}

SignUp.Header = function Header(): React.JSX.Element {
  // @ts-ignore
  return null;
};
SignUp.FormFields = function FormFields() {
  return <DefaultFormFields />;
};
SignUp.Footer = function Footer(): React.JSX.Element {
  // @ts-ignore
  return null;
};
