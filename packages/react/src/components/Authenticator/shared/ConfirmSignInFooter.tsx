import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';

const {
  getConfirmText,
  getConfirmingText,
  getBackToSignInText,
  getResendCodeText,
} = authenticatorTextUtil;

export const ConfirmSignInFooter = (): React.JSX.Element => {
  const { isPending, toSignIn, challengeName, resendCode } = useAuthenticator(
    (context) => [
      context.isPending,
      context.toSignIn,
      context.challengeName,
      context.resendCode,
    ]
  );

  const showResendCode =
    (challengeName === 'EMAIL_OTP' || challengeName === 'SMS_MFA') &&
    resendCode;

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
