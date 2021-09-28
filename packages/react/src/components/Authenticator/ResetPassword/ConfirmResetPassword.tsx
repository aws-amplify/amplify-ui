import { I18n } from 'aws-amplify';
import { getActorState, ResetPasswordState } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { handleFormChange, handleFormSubmit } from '../../../utils';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmResetPassword';
  const {
    components: { FieldGroup, Flex, Form, Heading, PasswordField },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState = getActorState(_state) as ResetPasswordState;
  const isPending = actorState.matches('confirmResetPassword.pending');

  const headerText = I18n.get('Reset your password');
  const passwordText = I18n.get('New password');

  return (
    <Form
      data-amplify-authenticator-confirmresetpassword=""
      method="post"
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <FieldGroup direction="column" disabled={isPending}>
          <ConfirmationCodeInput amplifyNamespace={amplifyNamespace} />

          <PasswordField
            data-amplify-password
            className="password-field"
            placeholder={passwordText}
            required
            name="password"
            label={passwordText}
            labelHidden={true}
          />
        </FieldGroup>

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />
        <TwoButtonSubmitFooter
          cancelButtonSendType="RESEND"
          cancelButtonText={I18n.get('Resend Code')}
          amplifyNamespace={amplifyNamespace}
          isPending={isPending}
        />
      </Flex>
    </Form>
  );
};
