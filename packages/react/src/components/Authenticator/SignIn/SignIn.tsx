import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { View } from '../../../primitives/View';
import { VisuallyHidden } from '../../../primitives/VisuallyHidden';
import { FederatedSignIn } from '../FederatedSignIn';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';

const {
  getSignInText,
  getSigningInText,
  getForgotPasswordText,
  getSignInWithEmailText,
  getSignInWithSmsText,
  getSignInWithPasskeyText,
  getOtherSignInOptionsText,
  getEnterUsernameFirstText,
} = authenticatorTextUtil;

export function SignIn(): React.JSX.Element {
  const {
    isPending,
    availableAuthMethods,
    preferredChallenge,
    toShowAuthMethods,
  } = useAuthenticator((context) => [
    context.isPending,
    context.availableAuthMethods,
    context.preferredChallenge,
    context.toShowAuthMethods,
  ]);
  const { handleChange, handleSubmit } = useFormHandlers();
  const [usernameValue, setUsernameValue] = React.useState('');

  const {
    components: {
      // @ts-ignore
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
  } = useCustomComponents();

  const hasMultipleMethods =
    availableAuthMethods && availableAuthMethods.length > 1;
  const showPreferredButton = hasMultipleMethods && preferredChallenge;
  const hasUsername = usernameValue.trim().length > 0;

  const handleFormChange = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      const { name, value } = e.target;
      // Track username for "Other sign-in options" button validation
      if (name === 'username' && typeof value === 'string') {
        setUsernameValue(value);
      }
      handleChange(e);
    },
    [handleChange]
  );

  const getPreferredButtonText = () => {
    if (!preferredChallenge) return getSignInText();
    switch (preferredChallenge) {
      case 'EMAIL_OTP':
        return getSignInWithEmailText();
      case 'SMS_OTP':
        return getSignInWithSmsText();
      case 'WEB_AUTHN':
        return getSignInWithPasskeyText();
      case 'PASSWORD':
      default:
        return getSignInText();
    }
  };

  const handlePreferredMethodClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For passwordless methods, just submit - the actor already knows the preferredChallenge
    handleSubmit(e);
  };

  const handleOtherOptionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toShowAuthMethods();
  };

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signin=""
        method="post"
        onSubmit={
          showPreferredButton ? handlePreferredMethodClick : handleSubmit
        }
        onChange={handleFormChange}
      >
        <FederatedSignIn />
        <Flex direction="column">
          <Flex as="fieldset" direction="column" isDisabled={isPending}>
            <VisuallyHidden>
              <legend>{getSignInText()}</legend>
            </VisuallyHidden>
            <FormFields />
          </Flex>

          <RemoteErrorMessage />

          <Button
            isDisabled={isPending}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={getSigningInText()}
          >
            {showPreferredButton ? getPreferredButtonText() : getSignInText()}
          </Button>

          {showPreferredButton && (
            <Button
              onClick={handleOtherOptionsClick}
              size="small"
              variation="link"
              isDisabled={isPending || !hasUsername}
              title={!hasUsername ? getEnterUsernameFirstText() : undefined}
            >
              {getOtherSignInOptionsText()}
            </Button>
          )}

          <Footer />
        </Flex>
      </form>
    </View>
  );
}

const DefaultFooter = () => {
  const { toForgotPassword } = useAuthenticator((context) => [
    context.toForgotPassword,
  ]);

  return (
    <View data-amplify-footer="">
      <Button onClick={toForgotPassword} size="small" variation="link">
        {getForgotPasswordText()}
      </Button>
    </View>
  );
};

SignIn.Footer = DefaultFooter;
SignIn.Header = function Header(): React.JSX.Element {
  // @ts-ignore
  return null;
};
