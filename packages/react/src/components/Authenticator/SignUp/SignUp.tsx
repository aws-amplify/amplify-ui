import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, View } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage } from '../shared';
import { FormFields } from './FormFields';
import { isInputEventTarget } from '../../../helpers/utils';

export function SignUp() {
  const { components, hasValidationErrors, isPending, submitForm, updateForm } =
    useAuthenticator();

  const {
    SignUp: {
      Header = SignUp.Header,
      FormFields = SignUp.FormFields,
      Footer = SignUp.Footer,
    },
  } = components;

  console.log({ components });

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputEventTarget(event.target)) {
      let { checked, name, type, value } = event.target;
      if (type === 'checkbox' && !checked) value = undefined;

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

        <Flex direction="column">
          <Flex direction="column">
            <FormFields />
            <RemoteErrorMessage />
          </Flex>

          <Button
            borderRadius={0}
            isDisabled={hasValidationErrors || isPending}
            isFullWidth={true}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={translate('Creating Account')}
            fontWeight="normal"
          >
            {translate('Create Account')}
          </Button>
        </Flex>
      </form>

      <Footer />
    </View>
  );
}

SignUp.Header = (): JSX.Element => null;
SignUp.FormFields = FormFields;
SignUp.Footer = (): JSX.Element => null;
