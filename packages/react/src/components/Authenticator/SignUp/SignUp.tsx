import { isEmpty } from 'lodash';

import {
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
  UserNameAlias,
  userNameAliasArray,
  translate,
} from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';
import {
  RemoteErrorMessage,
  UserNameAlias as UserNameAliasComponent,
} from '../shared';
export function SignUp() {
  const amplifyNamespace = 'Authenticator.SignUp';
  const {
    components: { Button, Flex, Form, Heading, PasswordField, Text },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignUpState = getActorState(_state);
  const isPending = actorState.matches('signUp.pending');
  const { validationError } = getActorContext(_state) as SignUpContext;

  const [primaryAlias, ...secondaryAliases] =
    _state.context.config?.login_mechanisms?.filter(
      (alias: any): alias is UserNameAlias => userNameAliasArray.includes(alias)
    ) ?? userNameAliasArray;

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

  const passwordLabel = translate('Password');
  const confirmPasswordLabel = translate('Confirm Password');
  const passwordFieldClass = 'password-field';

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
      <Flex direction="column">
        <Heading level={3}>{translate('Create a new account')}</Heading>

        <Flex direction="column">
          <UserNameAliasComponent
            data-amplify-usernamealias
            alias={primaryAlias}
          />
          <PasswordField
            data-amplify-password
            className={passwordFieldClass}
            placeholder={passwordLabel}
            isRequired={true}
            name="password"
            label={passwordLabel}
            labelHidden={true}
            autoComplete="new-password"
            hasError={!!validationError['confirm_password']}
          />
          <PasswordField
            data-amplify-confirmpassword
            className={passwordFieldClass}
            placeholder={confirmPasswordLabel}
            isRequired={true}
            name="confirm_password"
            label={confirmPasswordLabel}
            labelHidden={true}
            autoComplete="new-password"
            hasError={!!validationError['confirm_password']}
          />

          {!!validationError['confirm_password'] && (
            <Text variation="error">{validationError['confirm_password']}</Text>
          )}

          {secondaryAliases.map((alias: UserNameAlias) => (
            <UserNameAliasComponent
              data-amplify-usernamealias
              key={alias}
              alias={alias}
            />
          ))}

          <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />
        </Flex>

        <Button
          borderRadius={0}
          isDisabled={isPending}
          isFullWidth={true}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={translate('Creating Account')}
          fontWeight="normal"
        >
          {translate('Create Account')}
        </Button>

        <FederatedSignIn />
      </Flex>
    </Form>
  );
}
