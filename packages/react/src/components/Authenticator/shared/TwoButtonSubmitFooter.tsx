import React from 'react';
import { AuthEventTypes, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';

export interface TwoButtonSubmitFooterProps {
  cancelButtonSendType: AuthEventTypes;
  cancelButtonText: string;
  submitButtonText?: JSX.Element;
}

export const TwoButtonSubmitFooter = (
  props: TwoButtonSubmitFooterProps
): JSX.Element => {
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
    <>{translate('Submitting')}&hellip;</>
  ) : (
    <>{translate('Submit')}</>
  );
  const submitText = submitButtonText || defaultSubmitText;

  return (
    <Flex direction="column">
      <Button
        fontWeight="normal"
        variation="primary"
        isDisabled={isPending}
        type="submit"
      >
        {submitText}
      </Button>

      <Button
        onClick={onClick}
        type="button"
        variation="link"
        fontWeight="normal"
        size="small"
      >
        {cancelButtonText}
      </Button>
    </Flex>
  );
};
