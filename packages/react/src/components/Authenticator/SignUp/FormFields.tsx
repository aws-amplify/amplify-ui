import {
  getActorContext,
  LoginMechanism,
  LoginMechanismArray,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';
import { isEmpty } from 'lodash';

import { useAuthenticator } from '..';
import { PasswordField, Text } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';

export function FormFields() {
  const { _state } = useAuthenticator();
  const { validationError } = getActorContext(_state) as SignUpContext;

  const [primaryAlias, ...secondaryAliases] =
    _state.context.config?.loginMechanisms?.filter(
      (alias: any): alias is LoginMechanism =>
        LoginMechanismArray.includes(alias)
    ) ?? LoginMechanismArray;

  /**
   * If the login_mechanisms are configured to use ONLY username, we need
   * to ask for some sort of secondary contact information in order to
   * verify the user for Cognito. Currently matching this to how Vue is
   * set up.
   */
  if (primaryAlias === 'username' && isEmpty(secondaryAliases)) {
    secondaryAliases.push('email', 'phone_number');
  }

  const passwordLabel = translate('Password');
  const confirmPasswordLabel = translate('Confirm Password');
  const passwordFieldClass = 'password-field';

  return (
    <>
      <UserNameAliasComponent data-amplify-usernamealias alias={primaryAlias} />

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
        <Text role="alert" variation="error">
          {validationError['confirm_password']}
        </Text>
      )}

      {/* TODO These should use aws_cognito_signup_attributes, aws_cognito_verification_mechanisms, etc. to determine required fields */}

      {secondaryAliases.map((alias: LoginMechanism) => (
        <UserNameAliasComponent
          data-amplify-usernamealias
          key={alias}
          alias={alias}
        />
      ))}
    </>
  );
}
