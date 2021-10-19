import { getActorContext, ResetPasswordContext } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Flex, Form, Heading, PasswordField, Text } from '../../..';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmResetPassword = (): JSX.Element => {
  const { _state, isPending, submitForm, updateForm } = useAuthenticator();
  const { validationError } = getActorContext(_state) as ResetPasswordContext;

  const headerText = I18n.get('Reset your password');
  const passwordText = I18n.get('New password');
  const confirmPasswordLabel = I18n.get('Confirm Password');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
      data-amplify-authenticator-confirmresetpassword=""
      method="post"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput />

          <PasswordField
            data-amplify-password
            className="password-field"
            placeholder={passwordText}
            required
            name="password"
            label={passwordText}
            labelHidden={true}
          />
          <PasswordField
            data-amplify-confirmpassword
            placeholder={confirmPasswordLabel}
            required
            name="confirm_password"
            label={confirmPasswordLabel}
            labelHidden={true}
            hasError={!!validationError['confirm_password']}
          />

          {!!validationError['confirm_password'] && (
            <Text variation="error">{validationError['confirm_password']}</Text>
          )}
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonSendType="RESEND"
          cancelButtonText={I18n.get('Resend Code')}
          isPending={isPending}
        />
      </Flex>
    </Form>
  );
};
