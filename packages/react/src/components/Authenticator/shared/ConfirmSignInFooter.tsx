import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { Button, Flex } from '../../..';

export const ConfirmSignInFooter = () => {
  const { isPending, toSignIn } = useAuthenticator((context) => [
    context.isPending,
    context.toSignIn,
  ]);

  return (
    <Flex direction="column">
      <Button
        isDisabled={isPending}
        type="submit"
        variation="primary"
        fontWeight="normal"
        isLoading={isPending}
        loadingText={translate('Confirming')}
      >
        {translate('Confirm')}
      </Button>

      <Button
        onClick={toSignIn}
        type="button"
        variation="link"
        fontWeight="normal"
        size="small"
      >
        {translate('Back to Sign In')}
      </Button>
    </Flex>
  );
};
