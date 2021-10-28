import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { Button, Flex, Form, Heading } from '../../..';
import {
  ConfirmationCodeInput,
  ConfirmationCodeInputProps,
  RemoteErrorMessage,
} from '../shared';

export function ConfirmSignUp() {
  const { isPending, resendCode, submitForm, updateForm } = useAuthenticator();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  const confirmationCodeInputProps: ConfirmationCodeInputProps = {
    label: translate('Confirmation Code'),
    placeholder: translate('Enter your code'),
  };

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-confirmsignup=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{translate('Confirm Sign Up')}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput {...confirmationCodeInputProps} />

          <RemoteErrorMessage />

          <Button
            variation="primary"
            isDisabled={isPending}
            type="submit"
            loadingText={translate('Confirming')}
            isLoading={isPending}
            fontWeight="normal"
          >
            {translate('Confirm')}
          </Button>

          <Button
            variation="default"
            onClick={resendCode}
            type="button"
            fontWeight="normal"
          >
            {translate('Resend Code')}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
