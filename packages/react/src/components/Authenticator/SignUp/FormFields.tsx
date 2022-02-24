import {
  getActorContext,
  LoginMechanism,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { PasswordField, Text } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';
import { AttributeField } from '../shared/AttributeField';

export function FormFields() {
  const { _state, updateForm, updateBlur } = useAuthenticator();
  const { country_code, validationError } = getActorContext(
    _state
  ) as SignUpContext;
  const { loginMechanisms, signUpAttributes } = _state.context.config;

  const fieldNames = Array.from(
    new Set([...loginMechanisms, ...signUpAttributes])
  );

  // Only 1 is supported, so `['email', 'phone_number']` will only show `email`
  const loginMechanism = fieldNames.shift() as LoginMechanism;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <>
      <UserNameAliasComponent
        alias={loginMechanism}
        data-amplify-usernamealias
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-password
        hasError={!!validationError['confirm_password']}
        isRequired
        name="password"
        label={translate('Password')}
        labelHidden={true}
        placeholder={translate('Password')}
        onBlur={handleBlur}
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-confirmpassword
        placeholder={translate('Confirm Password')}
        hasError={!!validationError['confirm_password']}
        isRequired
        label={translate('Confirm Password')}
        labelHidden={true}
        name="confirm_password"
        onBlur={handleBlur}
      />

      {validationError['confirm_password'] && (
        <Text role="alert" variation="error">
          {translate(validationError['confirm_password'])}
        </Text>
      )}

      {fieldNames.flatMap((name) => (
        // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
        <AttributeField name={name} />
      ))}
    </>
  );
}
