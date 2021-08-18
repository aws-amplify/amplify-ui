import { getActorState, ResetPasswordState } from '@aws-amplify/ui-core';
import { useAmplify, useAuth } from '../../../hooks';
import { ErrorText, SignInOrSubmitFooter } from '../shared';

export const ResetPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ResetPassword';
  const {
    components: { Fieldset, Footer, Form, Heading, Input, Label, Text },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();
  const actorState = getActorState(state) as ResetPasswordState;
  const isPending = actorState.matches('resetPassword.submit');

  const headerText = 'Reset your Password';
  const submitText = isPending ? <>Sending&hellip;</> : <>Send code</>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

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
      <Heading level={1}>{headerText}</Heading>

      <Fieldset disabled={isPending}>
        <Label data-amplify-resetpassword-label="">
          <Text>Username</Text>
          <Input
            autoComplete="username"
            name="username"
            placeholder="Enter your username"
            required={true}
            type="username"
          />
        </Label>
      </Fieldset>

      <ErrorText amplifyNamespace={amplifyNamespace} />
      <SignInOrSubmitFooter
        amplifyNamespace={amplifyNamespace}
        submitButtonText={submitText}
      />
    </Form>
  );
};
