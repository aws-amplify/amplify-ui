import { includes } from 'lodash';

import { useAmplify, useAuth } from '../../../hooks';

import {
  authInputAttributes,
  getActorContext,
  getActorState,
  socialProviderLoginMechanisms,
} from '@aws-amplify/ui-core';
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
  const actorState = getActorState(_state);
  const isPending = actorState.matches('signUp.pending');
  const { remoteError } = actorState.context;

  const [primaryAlias, ...secondaryAliases] = _state.context.config
    ?.login_mechanisms ?? ['username', 'email', 'phone_number'];

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
      <Heading>Create a new account</Heading>

      <FederatedSignIn />

      <Fieldset>
        <SignUp.AliasControl
          label={authInputAttributes[primaryAlias].label}
          name={primaryAlias}
        />
        <SignUp.PasswordControl />
        <SignUp.ConfirmPasswordControl />
        {secondaryAliases
          .filter((alias) => !includes(socialProviderLoginMechanisms, alias))
          .map((alias) => (
            <SignUp.AliasControl
              key={alias}
              label={authInputAttributes[alias].label}
              name={alias}
            />
          ))}
      </Fieldset>

      <ErrorText>{remoteError}</ErrorText>

      <Footer>
        <Text>Have an account?</Text>{' '}
        <Button onClick={() => send({ type: 'SIGN_IN' })} type="button">
          Sign in
        </Button>
        <Spacer />
        <Button isDisabled={isPending} type="submit">
          {isPending ? <>Creating Account&hellip;</> : <>Create Account</>}
        </Button>
      </Footer>
    </Form>
  );
}

SignUp.AliasControl = ({
  label = 'Username',
  name = 'username',
  placeholder = label,
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify('Authenticator.SignUp.Password');
  const [_state] = useAuth();
  const { validationError } = getActorContext(_state);
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
  label = 'Password',
  name = 'password',
  placeholder = label,
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify('Authenticator.SignUp.Password');
  const [_state] = useAuth();
  const { validationError } = getActorContext(_state);
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
  label = 'Confirm Password',
  name = 'confirm_password',
}) => {
  const {
    components: { Input, Label, Text, ErrorText },
  } = useAmplify('Authenticator.SignUp.Password');
  const [state] = useAuth();
  const { validationError } = getActorContext(state);
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
