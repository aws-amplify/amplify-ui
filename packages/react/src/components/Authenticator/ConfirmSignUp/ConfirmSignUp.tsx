import { I18n } from 'aws-amplify';

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
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  const confirmationCodeInputProps: ConfirmationCodeInputProps = {
    label: I18n.get('Confirmation Code'),
    placeholder: I18n.get('Enter your code'),
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
        <Heading level={3}>{I18n.get('Confirm Sign Up')}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput {...confirmationCodeInputProps} />

          <RemoteErrorMessage />

          <Button
            variation="primary"
            isDisabled={isPending}
            type="submit"
            loadingText={I18n.get('Confirming')}
            isLoading={isPending}
            fontWeight="normal"
          >
            {I18n.get('Confirm')}
          </Button>

          <Button
            variation="default"
            onClick={resendCode}
            type="button"
            fontWeight="normal"
          >
            {I18n.get('Resend Code')}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
