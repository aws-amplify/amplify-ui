import { I18n } from 'aws-amplify';
import { getActorState, ResetPasswordState } from '@aws-amplify/ui';

import { useAmplify, useAuth } from '../../../hooks';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

export const ResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ResetPassword';
  const {
    components: { FieldGroup, Flex, Form, Heading, TextField },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();
  const actorState = getActorState(state) as ResetPasswordState;
  const isPending = actorState.matches('resetPassword.submit');

  const headerText = I18n.get('Reset your password');
  const submitText = isPending ? (
    <>{I18n.get('Sending')}&hellip;</>
  ) : (
    <>{I18n.get('Send code')}</>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

  const inputLabel = I18n.get('Enter your username');

  return (
    <Form
      data-amplify-authenticator-resetpassword=""
      method="post"
      onChange={handleChange}
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <FieldGroup direction="column" disabled={isPending}>
          <TextField
            autoComplete="username"
            name="username"
            placeholder={inputLabel}
            label={inputLabel}
            labelHidden={true}
            required={true}
            type="username"
          />
        </FieldGroup>

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />
        <TwoButtonSubmitFooter
          amplifyNamespace={amplifyNamespace}
          cancelButtonText={I18n.get('Back to Sign In')}
          cancelButtonSendType="SIGN_IN"
          isPending={isPending}
          submitButtonText={submitText}
        />
      </Flex>
    </Form>
  );
};
