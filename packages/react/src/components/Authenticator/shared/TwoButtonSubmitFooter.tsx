import { I18n } from 'aws-amplify';
import { AuthEventTypes } from '@aws-amplify/ui';

import { useAmplify, useAuth } from '../../../hooks';

export interface TwoButtonSubmitFooterProps {
  amplifyNamespace: string;
  isPending: boolean;
  cancelButtonSendType: AuthEventTypes;
  cancelButtonText: string;
  submitButtonText?: JSX.Element;
}

export const TwoButtonSubmitFooter = (
  props: TwoButtonSubmitFooterProps
): JSX.Element => {
  const {
    amplifyNamespace,
    cancelButtonSendType,
    cancelButtonText,
    isPending,
    submitButtonText,
  } = props;

  const {
    components: { Button, Flex },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();

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
