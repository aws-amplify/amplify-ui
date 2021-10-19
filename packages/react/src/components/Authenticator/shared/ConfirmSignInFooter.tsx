import { I18n } from 'aws-amplify';

import { useAuthenticator } from '../..';
import { Button, Flex } from '../../..';

export const ConfirmSignInFooter = () => {
  const { isPending, signIn } = useAuthenticator();

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

      <Button
        onClick={signIn}
        type="button"
        variation="link"
        fontWeight="normal"
        size="small"
      >
        {I18n.get('Back to Sign In')}
      </Button>
    </Flex>
  );
};
