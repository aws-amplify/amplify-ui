import {
  getActorContext,
  getAliasInfoFromContext,
  LoginMechanism,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';
import { Flex, ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';
import capitalize from 'lodash/capitalize';
import words from 'lodash/words';
import * as React from 'react';

import { useAuthenticator } from '..';
import { PasswordField, Text, TextField } from '../../..';
import { AttributeField } from './AttributeField';

export function FormFields() {
  const { _state, updateBlur } = useAuthenticator();
  const { formValues, validationError } = getActorContext(
    _state
  ) as SignUpContext;
  const { loginMechanisms, signUpAttributes } = _state.context.config;
  const [loginMechanismIndex, setLoginMechanismIndex] = React.useState(0);
  const { error, label, type } = getAliasInfoFromContext(_state.context);

  // Only 1 mechanism can be used for `username`
  const usernameAlias = loginMechanisms[loginMechanismIndex] as LoginMechanism;
  const fieldNames = Array.from(
    new Set([
      // Remove duplicate sign up attribute that's a selected login mechanism
      ...signUpAttributes.filter(
        (attribute) => attribute !== loginMechanisms[loginMechanismIndex]
      ),
    ])
  );

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <>
      {loginMechanisms.length > 1 && (
        <Flex alignItems="baseline">
          <Text>Login with</Text>

          <ToggleButtonGroup
            isExclusive
            onChange={(value) => setLoginMechanismIndex(Number(value))}
            value={String(loginMechanismIndex)}
          >
            {loginMechanisms.map((alias, i) => (
              <ToggleButton key={alias} value={String(i)}>
                <Text fontSize="var(--amplify-font-sizes-xs)">
                  {words(alias).map(capitalize).join(' ')}
                </Text>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Flex>
      )}

      {['email', 'phone_number'].includes(usernameAlias) ? (
        <>
          <AttributeField autoComplete="username" name={usernameAlias} />
          <input
            name="username"
            readOnly
            type="hidden"
            value={
              usernameAlias === 'phone_number'
                ? `${formValues.country_code ?? ''}${formValues.phone ?? ''}`
                : formValues.email
            }
          />
        </>
      ) : (
        <TextField
          autoComplete="username"
          errorMessage={error}
          label={translate(label)}
          labelHidden={true}
          name="username"
          required
          placeholder={translate(label)}
          isRequired
          type={type}
        />
      )}

      <PasswordField
        autoComplete="new-password"
        data-amplify-password
        hasError={!!validationError['confirm_password']}
        isRequired
        key="password"
        name="password"
        label={translate('Password')}
        labelHidden
        placeholder={translate('Password')}
        onBlur={handleBlur}
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-confirmpassword
        placeholder={translate('Confirm Password')}
        hasError={!!validationError['confirm_password']}
        isRequired
        key="confirm_password"
        label={translate('Confirm Password')}
        labelHidden={true}
        name="confirm_password"
        onBlur={handleBlur}
      />

      {validationError['confirm_password'] && (
        <Text role="alert" variation="error">
          {validationError['confirm_password']}
        </Text>
      )}

      {fieldNames.flatMap((name) => (
        <AttributeField key={name} name={name} />
      ))}
    </>
  );
}
