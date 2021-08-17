import { I18n } from '@aws-amplify/core';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';
import { UserNameAlias } from '../shared';

export function SignIn() {
  const {
    components: {
      Box,
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
  } = useAmplify('Authenticator.SignIn');

  const [state, send] = useAuth();
  const isPending = state.matches('signIn.pending');

  const translations = {
    headerText: I18n.get('Sign in to your account'),
    passwordLabel: I18n.get('Password'),
    forgotPasswordText: I18n.get('Forgot your password? '),
    resetPasswordText: I18n.get('Reset password'),
    noAccountText: I18n.get('No account? '),
    createAccountText: I18n.get('Create account'),
    signInPendingText: I18n.get('Signing in'),
    signInText: I18n.get('Sign in'),
  };

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-signin=""
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
      <Heading level={1}>{translations.headerText}</Heading>

      <FederatedSignIn />

      <Fieldset disabled={isPending}>
        <UserNameAlias data-amplify-usernamealias />

        <Label data-amplify-password>
          <Text>{translations.passwordLabel}</Text>
          <Input name="password" required type="password" />
          <Box>
            <Text>{translations.forgotPasswordText}</Text>
            <Button
              onClick={() => send({ type: 'RESET_PASSWORD' })}
              type="button"
            >
              {translations.resetPasswordText}
            </Button>
          </Box>
        </Label>
      </Fieldset>

      <Footer>
        <Text>{translations.noAccountText}</Text>
        <Button onClick={() => send({ type: 'SIGN_UP' })} type="button">
          {translations.createAccountText}
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? (
            <>{translations.signInPendingText}&hellip;</>
          ) : (
            <>{translations.signInText}</>
          )}
        </Button>
      </Footer>
      <Box data-amplify-error>{state.event.data?.message}</Box>
    </Form>
  );
}
