import {
  getActorContext,
  ResetPasswordContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Form, Heading, PasswordField, Text } from '../../..';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmResetPassword = (): JSX.Element => {
  const { _state, submitForm, updateForm } = useAuthenticator();
  const { validationError } = getActorContext(_state) as ResetPasswordContext;

  const headerText = translate('Reset your password');
  const passwordText = translate('New password');
  const confirmPasswordLabel = translate('Confirm Password');

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
            <Text role="alert" variation="error">
              {validationError['confirm_password']}
            </Text>
          )}
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonSendType="RESEND"
          cancelButtonText={translate('Resend Code')}
        />
      </Flex>
    </Form>
  );
};
