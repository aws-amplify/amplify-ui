import { I18n } from '@aws-amplify/core';
import { getActorState, ResetPasswordState } from '@aws-amplify/ui';

import { useAmplify, useAuth } from '../../../hooks';
import {
  ConfirmationCodeInput,
  ErrorText,
  PasswordInput,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmResetPassword';
  const {
    components: { Box, Button, Fieldset, Form, Heading, Input, Label, Text },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
  const actorState = getActorState(_state) as ResetPasswordState;
  const isPending = actorState.matches('confirmResetPassword.pending');

  const headerText = I18n.get('Reset your Password');

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
      <Heading level={1}>{headerText}</Heading>

      <Fieldset disabled={isPending}>
        <Label data-amplify-confirmresetpasswordcode-label="">
          <ConfirmationCodeInput amplifyNamespace={amplifyNamespace} />
        </Label>

        <Label data-amplify-confirmresetpasswordnew-label="">
          <PasswordInput
            amplifyNamespace={amplifyNamespace}
            label={I18n.get('New password')}
          />
        </Label>

        <Box>
          <Text>{I18n.get('Lost your code? ')}</Text>
          <Button
            onClick={() => {
              send({
                type: 'RESEND',
              });
            }}
            type="button"
          >
            {I18n.get('Resend Code')}
          </Button>
        </Box>
      </Fieldset>

      <ErrorText amplifyNamespace={amplifyNamespace} />
      <TwoButtonSubmitFooter
        cancelButtonSendType="SIGN_IN"
        cancelButtonText={I18n.get('Sign in')}
        amplifyNamespace={amplifyNamespace}
        isPending={isPending}
      />
    </Form>
  );
};
