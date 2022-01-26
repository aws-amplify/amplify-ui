import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, View } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage } from '../shared';
import { FormFields } from './FormFields';
import { isInputOrSelectElement, isInputElement } from '../../../helpers/utils';
import { useCustomComponents } from '../hooks/useCustomComponents';

export function SignUp() {
  const { hasValidationErrors, isPending, submitForm, updateForm } =
    useAuthenticator();

  const {
    components: {
      SignUp: {
        Header = SignUp.Header,
        FormFields = SignUp.FormFields,
        Footer = SignUp.Footer,
      },
    },
  } = useCustomComponents();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputOrSelectElement(event.target)) {
      let { name, type, value } = event.target;
      if (
        isInputElement(event.target) &&
        type === 'checkbox' &&
        !event.target.checked
      ) {
        value = undefined;
      }

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signup=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
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
SignUp.FormFields = FormFields;
SignUp.Footer = (): JSX.Element => null;
