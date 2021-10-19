import { AuthEventTypes, translate } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';

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

  const [state, send] = useAuthenticator();

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
