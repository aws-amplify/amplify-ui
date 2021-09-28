import { isEmpty } from 'lodash';

import { I18n } from 'aws-amplify';
import {
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
  UserNameAlias,
  userNameAliasArray,
} from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { handleFormChange, handleFormSubmit } from '../../../utils';
import { FederatedSignIn } from '../FederatedSignIn';
import {
  RemoteErrorMessage,
  UserNameAlias as UserNameAliasComponent,
} from '../shared';

export function SignUp() {
  const amplifyNamespace = 'Authenticator.SignUp';
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

  const [_state, _send] = useAuthenticator();
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

  const passwordLabel = I18n.get('Password');
  const confirmPasswordLabel = I18n.get('Confirm Password');
  const passwordFieldClass = 'password-field';

  return (
    <Form
      data-amplify-authenticator-signup=""
      method="post"
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Create a new account')}</Heading>

        <FieldGroup disabled={isPending} direction="column">
          <UserNameAliasComponent
            data-amplify-usernamealias
            alias={primaryAlias}
          />
          <PasswordField
            data-amplify-password
            className={passwordFieldClass}
            placeholder={passwordLabel}
            required
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
            required
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
        </FieldGroup>

        <Button
          borderRadius={0}
          isDisabled={isPending}
          isFullWidth={true}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={I18n.get('Creating Account')}
          fontWeight="normal"
        >
          {I18n.get('Create Account')}
        </Button>

        <FederatedSignIn />
      </Flex>
    </Form>
  );
}
