import {
  getActorContext,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import * as React from 'react';
import { useAmplify, useAuth } from '../../../hooks';

export const ForceNewPassword = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ForceNewPassword';
  const {
    components: {
      Button,
      FieldGroup,
      Flex,
      Form,
      Heading,
      PasswordField,
      Text,
    },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
  const actorState: SignInState = getActorState(_state);
  const { remoteError } = actorState.context;
  const { validationError } = getActorContext(_state) as SignInContext;
  const isPending = actorState.matches('forceNewPassword.pending');

  const headerText = I18n.get('Change Password');
  const passwordLabel = I18n.get('Password');
  const confirmPasswordLabel = I18n.get('Confirm Password');

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

        <FieldGroup direction="column" disabled={isPending}>
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
        </FieldGroup>

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
          loadingText={I18n.get('Changing')}
          fontWeight="normal"
        >
          {I18n.get('Change Password')}
        </Button>
        <Button
          onClick={() => send({ type: 'SIGN_IN' })}
          type="button"
          fontWeight="normal"
          variation="link"
          size="small"
        >
          {I18n.get('Back to Sign In')}
        </Button>
      </Flex>
    </Form>
  );
};
