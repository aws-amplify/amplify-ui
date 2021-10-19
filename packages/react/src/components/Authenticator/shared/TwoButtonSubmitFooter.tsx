import { AuthEventTypes } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { Button, Flex } from '../../../primitives';

export interface TwoButtonSubmitFooterProps {
  isPending: boolean;
  cancelButtonSendType: AuthEventTypes;
  cancelButtonText: string;
  submitButtonText?: JSX.Element;
}

export const TwoButtonSubmitFooter = (
  props: TwoButtonSubmitFooterProps
): JSX.Element => {
  const {
    cancelButtonSendType,
    cancelButtonText,
    isPending,
    submitButtonText,
  } = props;

  const defaultSubmitText = isPending ? (
    <>{I18n.get('Submitting')}&hellip;</>
  ) : (
    <>{I18n.get('Submit')}</>
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
        onClick={() => send({ type: cancelButtonSendType })}
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
