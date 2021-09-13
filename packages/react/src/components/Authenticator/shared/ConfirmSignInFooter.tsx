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
    components: { Button, Flex },
  } = useAmplify(amplifyNamespace);

  return (
    <Flex direction="column">
      <Button
        isDisabled={isPending}
        type="submit"
        variation="primary"
        fontWeight="normal"
        isLoading={isPending}
        loadingText={I18n.get('Confirming')}
      >
        {I18n.get('Confirm')}
      </Button>
      {!shouldHideReturnBtn && (
        <Button
          onClick={() => send({ type: 'SIGN_IN' })}
          type="button"
          variation="link"
          fontWeight="normal"
          size="small"
        >
          {I18n.get('Back to Sign In')}
        </Button>
      )}
    </Flex>
  );
};
