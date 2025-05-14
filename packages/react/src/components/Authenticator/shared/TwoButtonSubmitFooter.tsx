import React from 'react';
import type { AuthEventTypes } from '@aws-amplify/ui';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';

export interface TwoButtonSubmitFooterProps {
  cancelButtonSendType: AuthEventTypes;
  cancelButtonText: string;
  submitButtonText?: React.JSX.Element;
}

const { getSubmitText, getSubmittingText } = authenticatorTextUtil;

export const TwoButtonSubmitFooter = (
  props: TwoButtonSubmitFooterProps
): React.JSX.Element => {
  const { cancelButtonSendType, cancelButtonText, submitButtonText } = props;

  const { isPending, resendCode, skipVerification, toSignIn } =
    useAuthenticator((context) => [context.isPending]);

  const onClick = () => {
    switch (cancelButtonSendType) {
      case 'SKIP':
        skipVerification();
        break;
      case 'RESEND':
        resendCode();
        break;
      case 'SIGN_IN':
        toSignIn();
        break;
      default:
        return;
    }
  };

  const defaultSubmitText = isPending ? (
    <>{getSubmittingText()}&hellip;</>
  ) : (
    <>{getSubmitText()}</>
  );
  const submitText = submitButtonText ?? defaultSubmitText;

  return (
    <Flex direction="column">
      <Button variation="primary" isDisabled={isPending} type="submit">
        {submitText}
      </Button>

      <Flex direction="column" alignItems="center">
        <Button onClick={onClick} type="button" variation="link" size="small">
          {cancelButtonText}
        </Button>
      </Flex>
    </Flex>
  );
};
