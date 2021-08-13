import { getActorState } from '../../../../../core';
import { useAmplify, useAuth } from '../../../hooks';

export const ForceNewPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ForceNewPassword';
  const {
    components: {
      Button,
      Fieldset,
      Footer,
      Form,
      Heading,
      Input,
      Label,
      Spacer,
      Text,
    },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();
  const actorState = getActorState(state);
  const { remoteError } = actorState.context;
  const isPending = actorState.matches('forceNewPassword.pending');

  const headerText = 'Change Password';

  return (
    <Form
      data-amplify-authenticator-forcenewpassword=""
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
        <Label data-amplify-forcenewpassword-label="">
          <Text>Change password</Text>
          <Input
            autoComplete="password"
            name="password"
            placeholder="Password"
            required={true}
            type="password"
          />
        </Label>
      </Fieldset>

      <Text className="forceNewPasswordErrorText" variant="error">
        {remoteError}
      </Text>

      <Footer>
        <Button onClick={() => send({ type: 'SIGN_IN' })} type="button">
          Back to Sign In
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? <>Changing&hellip;</> : <>Change password</>}
        </Button>
      </Footer>
    </Form>
  );
};
