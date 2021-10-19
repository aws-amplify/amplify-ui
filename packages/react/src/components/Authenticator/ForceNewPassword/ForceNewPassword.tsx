import {
  getActorContext,
  getActorState,
  SignInContext,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';

export const ForceNewPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ForceNewPassword';
  const {
    components: { Button, Flex, Form, Heading, PasswordField, Text },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const { remoteError } = actorState.context;
  const { validationError } = getActorContext(_state) as SignInContext;
  const isPending = actorState.matches('forceNewPassword.pending');

  const headerText = translate('Change Password');
  const passwordLabel = translate('Password');
  const confirmPasswordLabel = translate('Confirm Password');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

  return (
    <Form
      data-amplify-authenticator-forcenewpassword=""
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
          <PasswordField
            data-amplify-password
            placeholder={passwordLabel}
            required
            name="password"
            label={passwordLabel}
            labelHidden={true}
            hasError={!!validationError['confirm_password']}
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
            <Text variation="error">{validationError['confirm_password']}</Text>
          )}
        </Flex>

        {!!remoteError && (
          <Text className="forceNewPasswordErrorText" variation="error">
            {remoteError}
          </Text>
        )}

        <Button
          isDisabled={isPending}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={translate('Changing')}
          fontWeight="normal"
        >
          {translate('Change Password')}
        </Button>
        <Button
          onClick={() => send({ type: 'SIGN_IN' })}
          type="button"
          fontWeight="normal"
          variation="link"
          size="small"
        >
          {translate('Back to Sign In')}
        </Button>
      </Flex>
    </Form>
  );
};
