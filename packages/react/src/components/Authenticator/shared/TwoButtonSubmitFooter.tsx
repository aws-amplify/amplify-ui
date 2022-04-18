import { AuthEventTypes, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '../hooks/useAuthenticator';
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

  const { _send, isPending } = useAuthenticator((context) => [
    context.isPending,
  ]);

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
        onClick={() => _send({ type: cancelButtonSendType })}
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
