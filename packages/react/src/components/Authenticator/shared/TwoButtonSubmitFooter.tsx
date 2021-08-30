import { I18n } from '@aws-amplify/core';
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
    components: { Button, Footer, Spacer },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();

  const defaultSubmitText = isPending ? (
    <>{I18n.get('Submitting')}&hellip;</>
  ) : (
    <>{I18n.get('Submit')}</>
  );
  const submitText = submitButtonText || defaultSubmitText;

  return (
    <Footer>
      <Button
        onClick={() => send({ type: cancelButtonSendType })}
        type="button"
      >
        {cancelButtonText}
      </Button>
      <Spacer />
      <Button isDisabled={isPending} type="submit">
        {submitText}
      </Button>
    </Footer>
  );
};
