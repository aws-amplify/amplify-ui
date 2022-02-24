import {
  getActorContext,
  getActorState,
  LoginMechanism,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { PasswordField, PhoneNumberField, Text, TextField } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';

export function FormFields() {
  const { _state, updateForm, updateBlur } = useAuthenticator();
  const { country_code, validationError } = getActorContext(
    _state
  ) as SignUpContext;
  const { loginMechanisms, signUpAttributes } = _state.context.config;

  const fieldNames = Array.from(
    new Set([...loginMechanisms, ...signUpAttributes])
  );

  const formOverrides = getActorState(_state).context.formFields.signUp;

  // Only 1 is supported, so `['email', 'phone_number']` will only show `email`
  const loginMechanism = fieldNames.shift() as LoginMechanism;

  const userOR = formOverrides?.[loginMechanism];
  const passwordOR = formOverrides?.['password'];
  const cPasswordOR = formOverrides?.['confirm_password'];

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  interface fieldProps {
    labelHidden: boolean;
    isRequired: boolean;
    label: string;
    placeholder: string;
  }

  const propsCreator = (name: string, show: string): fieldProps => {
    const fo = formOverrides?.[name];
    return {
      labelHidden: fo?.labelHidden ?? false,
      isRequired: fo?.required ?? true,
      label: fo?.label ?? translate(show),
      placeholder: fo?.placeholder ?? translate(show),
    };
  };

  const phonePropsCreator = (name: string, show: string) => {
    const fo = formOverrides?.[name];
    return {
      ...propsCreator(name, show),
      defaultCountryCode: fo?.dialCode ?? country_code,
      dialCodeList: fo?.dialCodeList,
    };
  };

  return (
    <>
      <UserNameAliasComponent
        alias={loginMechanism}
        labelHidden={userOR?.labelHidden}
        placeholder={userOR?.placeholder}
        required={userOR?.required}
        label={userOR?.label}
        dialCode={userOR?.dialCode}
        dialCodeList={userOR?.dialCodeList}
        data-amplify-usernamealias
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-password
        hasError={!!validationError['confirm_password']}
        isRequired={passwordOR?.required ?? true}
        name="password"
        label={passwordOR?.label ?? translate('Password')}
        labelHidden={passwordOR?.labelHidden ?? true}
        placeholder={passwordOR?.placeholder ?? translate('Password')}
        onBlur={handleBlur}
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-confirmpassword
        placeholder={cPasswordOR?.placeholder ?? translate('Confirm Password')}
        hasError={!!validationError['confirm_password']}
        isRequired={cPasswordOR?.required ?? true}
        label={cPasswordOR?.label ?? translate('Confirm Password')}
        labelHidden={cPasswordOR?.labelHidden ?? true}
        name="confirm_password"
        onBlur={handleBlur}
      />

      {validationError['confirm_password'] && (
        <Text role="alert" variation="error">
          {translate(validationError['confirm_password'])}
        </Text>
      )}

      {fieldNames.flatMap((name) => {
        // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
        switch (name) {
          case 'birthdate':
            return (
              <TextField
                {...propsCreator('birthdate', 'Birthdate')}
                autoComplete="bday"
                key={name}
                name={name}
                type="date"
              />
            );

          case 'email':
            return (
              <TextField
                {...propsCreator('email', 'Email')}
                autoComplete="email"
                key={name}
                name={name}
                type="email"
              />
            );

          case 'family_name':
            return (
              <TextField
                autoComplete="family-name"
                {...propsCreator('family_name', 'Family Name')}
                key={name}
                name={name}
              />
            );

          case 'given_name':
            return (
              <TextField
                autoComplete="given-name"
                {...propsCreator('given_name', 'Given Name')}
                key={name}
                name={name}
              />
            );

          case 'middle_name':
            return (
              <TextField
                autoComplete="additional-name"
                {...propsCreator('middle_namme', 'Middle Name')}
                key={name}
                name={name}
              />
            );

          case 'name':
            return (
              <TextField
                autoComplete="name"
                {...propsCreator('name', 'Name')}
                key={name}
                name={name}
              />
            );

          case 'nickname':
            return (
              <TextField
                {...propsCreator('nickname', 'Nickname')}
                key={name}
                name={name}
              />
            );

          case 'phone_number':
            return (
              <PhoneNumberField
                autoComplete="tel"
                {...phonePropsCreator('phone_number', 'Phone Number')}
                countryCodeName="country_code"
                key={name}
                name={name}
              />
            );

          case 'preferred_username':
            return (
              <TextField
                {...propsCreator('preferred_username', 'Preferred Username')}
                key={name}
                name={name}
              />
            );

          case 'profile':
            return (
              <TextField
                autoComplete="url"
                {...propsCreator('profile', 'Profile')}
                key={name}
                name={name}
                type="url"
              />
            );

          case 'website':
            return (
              <TextField
                autoComplete="url"
                {...propsCreator('website', 'Website')}
                key={name}
                name="website"
                type="url"
              />
            );

          case 'address':
          case 'gender':
          case 'locale':
          case 'picture':
          case 'updated_at':
          case 'zoneinfo':
          default:
            // There's a `custom:*` attribute or one we don't already have an implementation for
            console.debug(
              `Authenticator does not have a default implementation for ${name}. Customize Authenticator.SignUp.FormFields to add your own.`
            );
        }
      })}
    </>
  );
}
