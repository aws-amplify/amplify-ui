import { getActorState } from '@aws-amplify/ui-core';
import { useAmplify, useAuth } from '../../../hooks';
import {
  ConfirmationCodeInput,
  ErrorText,
  PasswordInput,
  SignInOrSubmitFooter,
} from '../shared';

export const ConfirmResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmResetPassword';
  const {
    components: { Box, Button, Fieldset, Form, Heading, Input, Label, Text },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
  const actorState = getActorState(_state);
  const isPending = actorState.matches('confirmResetPassword.pending');

  const headerText = 'Reset your Password';

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
            label="New password"
          />
        </Label>

        <Box>
          <Text>Lost your code?</Text>{' '}
          <Button
            onClick={() => {
              send({
                type: 'RESEND',
              });
            }}
            type="button"
          >
            Resend Code
          </Button>
        </Box>
      </Fieldset>

      <ErrorText amplifyNamespace={amplifyNamespace} />
      <SignInOrSubmitFooter amplifyNamespace={amplifyNamespace} />
    </Form>
  );
};
