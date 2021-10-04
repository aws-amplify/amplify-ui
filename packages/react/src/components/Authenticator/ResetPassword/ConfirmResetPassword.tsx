import { I18n } from 'aws-amplify';
import { getActorState, ResetPasswordState } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmResetPassword';
  const {
    components: { Flex, Form, Heading, PasswordField },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState = getActorState(_state) as ResetPasswordState;
  const isPending = actorState.matches('confirmResetPassword.pending');

  const headerText = I18n.get('Reset your password');
  const passwordText = I18n.get('New password');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

  return (
    <Form
      data-amplify-authenticator-confirmresetpassword=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
      onChange={handleChange}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput amplifyNamespace={amplifyNamespace} />

          <PasswordField
            data-amplify-password
            className="password-field"
            placeholder={passwordText}
            required
            name="password"
            label={passwordText}
          />
        </Flex>

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
