import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { isOtpChallenge } from '../utils';

const {
  getConfirmText,
  getConfirmingText,
  getBackToSignInText,
  getResendCodeText,
} = authenticatorTextUtil;

export const ConfirmSignInFooter = (): React.JSX.Element => {
  const {
    isPending,
    toSignIn,
    challengeName,
    resendCode,
    selectedAuthMethod,
    availableAuthMethods,
  } = useAuthenticator((context) => [
    context.isPending,
    context.toSignIn,
    context.challengeName,
    context.resendCode,
    context.selectedAuthMethod,
    context.availableAuthMethods,
  ]);

  // Only show "Resend Code" for passwordless (USER_AUTH) flows.
  // Password-based sign-in does not support resending MFA codes.
  const hasPasswordlessMethod =
    (!!selectedAuthMethod && selectedAuthMethod !== 'PASSWORD') ||
    !!availableAuthMethods?.some((m) => m !== 'PASSWORD');
  const showResendCode =
    isOtpChallenge(challengeName) && hasPasswordlessMethod && resendCode;

  return (
    <Flex direction="column">
      <Button
        isDisabled={isPending}
        type="submit"
        variation="primary"
        isLoading={isPending}
        loadingText={getConfirmingText()}
      >
        {getConfirmText()}
      </Button>

      {showResendCode && (
        <Button onClick={resendCode} type="button">
          {getResendCodeText()}
        </Button>
      )}

      <Button onClick={toSignIn} type="button" variation="link" size="small">
        {getBackToSignInText()}
      </Button>
    </Flex>
  );
};
