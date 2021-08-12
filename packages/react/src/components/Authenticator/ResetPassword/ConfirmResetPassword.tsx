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

  const [state, send] = useAuth();
  const isPending = state.matches('confirmResetPassword.pending');

  const headerText = 'Reset your Password';

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
                data: {
                  username: state.context.username,
                },
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
