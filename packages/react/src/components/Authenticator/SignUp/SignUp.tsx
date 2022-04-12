import { translate } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { View } from '../../../primitives/View';
import { FederatedSignIn } from '../FederatedSignIn';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';

export function SignUp() {
  const { hasValidationErrors, isPending } = useAuthenticator((context) => [
    context.hasValidationErrors,
    context.isPending,
  ]);
  const { handleChange, handleBlur, handleSubmit } = useFormHandlers();

  const {
    components: {
      SignUp: {
        Header = SignUp.Header,
        FormFields = SignUp.FormFields,
        Footer = SignUp.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signup=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <FederatedSignIn />

        <fieldset
          style={{ display: 'flex', flexDirection: 'column' }}
          className="amplify-flex"
          disabled={isPending}
        >
          <Flex direction="column">
            <FormFields />
            <RemoteErrorMessage />
          </Flex>

          <Button
            isDisabled={hasValidationErrors || isPending}
            isFullWidth={true}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={translate('Creating Account')}
          >
            {translate('Create Account')}
          </Button>
        </fieldset>
      </form>

      <Footer />
    </View>
  );
}

SignUp.Header = (): JSX.Element => null;
SignUp.FormFields = () => <FormFields route="signUp" />;
SignUp.Footer = (): JSX.Element => null;
