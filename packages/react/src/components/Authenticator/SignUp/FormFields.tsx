import {
  getActorContext,
  SignUpContext,
  UserNameAlias,
  userNameAliasArray,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import { isEmpty } from 'lodash';

import { useAuthenticator } from '..';
import { PasswordField, Text } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';

export function FormFields() {
  const { _state } = useAuthenticator();
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
        <Text variation="error">{validationError['confirm_password']}</Text>
      )}

      {secondaryAliases.map((alias: UserNameAlias) => (
        <UserNameAliasComponent
          data-amplify-usernamealias
          key={alias}
          alias={alias}
        />
      ))}
    </>
  );
}
