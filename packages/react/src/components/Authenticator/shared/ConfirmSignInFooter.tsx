import { I18n } from 'aws-amplify';

export interface ConfirmSignInFooterProps {
  isPending: boolean;
  shouldHideReturnBtn?: boolean;
  send({ type: string }): void;
}

export const ConfirmSignInFooter = (
  props: ConfirmSignInFooterProps
): JSX.Element => {
  const { isPending, shouldHideReturnBtn = false, send } = props;

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
