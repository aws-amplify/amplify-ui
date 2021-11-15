import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, Form, Heading } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage } from '../shared';
import { FormFields } from './FormFields';

export function SignUp() {
  const { components, hasValidationErrors, isPending, submitForm, updateForm } =
    useAuthenticator();
  const {
    SignUp: { FormFields = SignUp.FormFields },
  } = components;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
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
    </Form>
  );
}

SignUp.FormFields = FormFields;
