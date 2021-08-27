import { includes, isEmpty } from 'lodash';

import { I18n } from '@aws-amplify/core';
import {
  authInputAttributes,
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
  socialProviderLoginMechanisms,
} from '@aws-amplify/ui-core';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';

export function SignUp() {
  const {
    components: {
      Button,
      Fieldset,
      Footer,
      Form,
      Heading,
      Spacer,
      Text,
      ErrorText,
    },
  } = useAmplify('Authenticator.SignUp');

  const [_state, send] = useAuth();
  const actorState: SignUpState = getActorState(_state);
  const isPending = actorState.matches('signUp.pending');
  const { remoteError } = actorState.context;

  const [primaryAlias, ...secondaryAliases] = _state.context.config
    ?.login_mechanisms ?? ['username', 'email', 'phone_number'];

  /**
   * If the login_mechanisms are configured to use ONLY username, we need
   * to ask for some sort of secondary contact information in order to
   * verify the user for Cognito. Currently matching this to how Vue is
   * set up.
   */
  if (primaryAlias === 'username' && isEmpty(secondaryAliases)) {
    secondaryAliases.push('email', 'phone_number');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

  return (
    <Form
      data-amplify-authenticator-signup=""
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
      <Heading>{I18n.get('Create a new account')}</Heading>

      <FederatedSignIn />

      <Fieldset>
        <SignUp.AliasControl
          label={I18n.get(authInputAttributes[primaryAlias].label)}
          name={primaryAlias}
        />
        <SignUp.PasswordControl />
        <SignUp.ConfirmPasswordControl />
        {secondaryAliases
          .filter((alias) => !includes(socialProviderLoginMechanisms, alias))
          .map((alias) => (
            <SignUp.AliasControl
              key={alias}
              label={I18n.get(authInputAttributes[alias].label)}
              name={alias}
            />
          ))}
      </Fieldset>

      <ErrorText>{remoteError}</ErrorText>

      <Footer>
        <Text>{I18n.get('Have an account? ')}</Text>
        <Button onClick={() => send({ type: 'SIGN_IN' })} type="button">
          {I18n.get('Sign in')}
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? (
            <>{I18n.get('Creating Account')}&hellip;</>
          ) : (
            <>{I18n.get('Create Account')}</>
          )}
        </Button>
      </Footer>
    </Form>
  );
}

SignUp.AliasControl = ({
  label = I18n.get('Username'),
  name = 'username',
  placeholder = label,
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify('Authenticator.SignUp.Alias');
  const [_state] = useAuth();
  const { validationError } = getActorContext(_state) as SignUpContext;
  const error = validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input
          name={name}
          placeholder={placeholder}
          required
          type={authInputAttributes[name].type}
        />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};

SignUp.PasswordControl = ({
  label = I18n.get('Password'),
  name = 'password',
  placeholder = label,
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify('Authenticator.SignUp.Password');
  const [_state] = useAuth();
  const { validationError } = getActorContext(_state) as SignUpContext;
  const error = validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input name={name} placeholder={placeholder} required type="password" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};

SignUp.ConfirmPasswordControl = ({
  label = I18n.get('Confirm Password'),
  name = 'confirm_password',
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify('Authenticator.SignUp.Password');
  const [state] = useAuth();
  const { validationError } = getActorContext(state) as SignUpContext;
  const error = validationError[name];

  return (
    <>
      <Label>
        <Text>{label}</Text>
        <Input name={name} placeholder={label} required type="password" />
      </Label>
      <ErrorText>{error}</ErrorText>
    </>
  );
};
