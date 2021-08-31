import { I18n } from 'aws-amplify';

import { useAmplify } from '../../../hooks';

export interface ConfirmSignInFooterProps {
  amplifyNamespace: string;
  isPending: boolean;
  shouldHideReturnBtn?: boolean;
  send({ type: string }): void;
}

export const ConfirmSignInFooter = (
  props: ConfirmSignInFooterProps
): JSX.Element => {
  const {
    amplifyNamespace,
    isPending,
    shouldHideReturnBtn = false,
    send,
  } = props;

  const {
    components: { Button, Footer, Spacer },
  } = useAmplify(amplifyNamespace);

  return (
    <Footer>
      {!shouldHideReturnBtn && (
        <Button onClick={() => send({ type: 'SIGN_IN' })} type="button">
          {I18n.get('Back to Sign In')}
        </Button>
      )}
      <Spacer />
      <Button isDisabled={isPending} type="submit">
        {isPending ? (
          <>{I18n.get('Confirming')}&hellip;</>
        ) : (
          <>{I18n.get('Confirm')}</>
        )}
      </Button>
    </Footer>
  );
};
