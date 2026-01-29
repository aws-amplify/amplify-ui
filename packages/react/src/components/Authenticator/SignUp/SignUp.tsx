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

const {
  getCreateAccountText,
  getCreatingAccountText,
  getCreateAccountWithEmailText,
  getCreateAccountWithPasswordText,
  getCreateAccountWithSmsText,
  getOrText,
} = authenticatorTextUtil;

export function SignUp(): React.JSX.Element {
  const {
    hasValidationErrors,
    isPending,
    availableAuthMethods,
    preferredChallenge,
    selectedAuthMethod,
  } = useAuthenticator((context) => [
    context.hasValidationErrors,
    context.isPending,
    context.availableAuthMethods,
    context.preferredChallenge,
    context.selectedAuthMethod,
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
        return getCreateAccountWithEmailText();
      case 'SMS_OTP':
        return getCreateAccountWithSmsText();
      case 'PASSWORD':
        return hasMultipleMethods
          ? getCreateAccountWithPasswordText()
          : getCreateAccountText();
      default:
        return getCreateAccountText();
    }
  };

  const handleMethodClick = (method: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const form = (e.target as HTMLElement).closest('form');
    if (form) {
      // Get or create the hidden input
      if (!form.__authMethod) {
        const input = document.createElement('input');
        input.name = '__authMethod';
        form.appendChild(input);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      form.__authMethod.type = 'hidden';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      form.__authMethod.value = method;

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
            isDisabled={
              ((!hasMultipleMethods || otherMethods.length == 0) &&
                hasValidationErrors) ||
              isPending
            }
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
                {getOrText()}
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
