import { getActorState, ResetPasswordState, translate } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

export const ResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ResetPassword';
  const {
    components: { Flex, Form, Heading, TextField },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuthenticator();
  const actorState = getActorState(state) as ResetPasswordState;
  const isPending = actorState.matches('resetPassword.submit');

  const headerText = translate('Reset your password');
  const submitText = isPending ? (
    <>{translate('Sending')}&hellip;</>
  ) : (
    <>{translate('Send code')}</>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

  const inputLabel = translate('Enter your username');

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

        <Flex direction="column">
          <TextField
            autoComplete="username"
            name="username"
            placeholder={inputLabel}
            label={inputLabel}
            labelHidden={true}
            required={true}
            type="username"
          />
        </Flex>

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />
        <TwoButtonSubmitFooter
          amplifyNamespace={amplifyNamespace}
          cancelButtonText={translate('Back to Sign In')}
          cancelButtonSendType="SIGN_IN"
          isPending={isPending}
          submitButtonText={submitText}
        />
      </Flex>
    </Form>
  );
};
