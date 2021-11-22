import {
  ActorContextWithForms,
  getActorContext,
  getAliasInfoFromContext,
  LoginMechanism,
  translate,
} from '@aws-amplify/ui';
import React, { useState } from 'react';

import { useAuthenticator } from '..';
import { PhoneNumberField, TextField } from '../../..';

export interface UserNameAliasProps {
  alias?: LoginMechanism;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { alias, ...attrs } = props;
  const { _state, updateForm } = useAuthenticator();

  const { country_code: defaultCountryCode }: ActorContextWithForms =
    getActorContext(_state);
  const { label, type, error } = getAliasInfoFromContext(_state.context, alias);
  const i18nLabel = translate<string>(label);

  const isPhoneAlias = type === 'tel';
  const inputFieldName = alias ?? 'username';
  const countryCodeName = 'country_code';

  const [fullPhoneNumber, setFullPhoneNumber] = useState({
    [countryCodeName]: defaultCountryCode,
  });

  /**
   * When the field being rendered is for a phone number, this handler is used to prevent change event propagation in
   * order to manually update the state machine with a country code + phone number.
   */
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.stopPropagation();

    const newState = {
      ...fullPhoneNumber,
      [event.target.name]: event.target.value,
    };

    updateForm({
      name: inputFieldName,
      value: newState[countryCodeName] + newState[inputFieldName],
    });

    setFullPhoneNumber(newState);
  };

  return isPhoneAlias ? (
    <PhoneNumberField
      autoComplete="username"
      countryCodeName={countryCodeName}
      defaultCountryCode={defaultCountryCode}
      errorMessage={error}
      label={i18nLabel}
      labelHidden={true}
      name={inputFieldName}
      onCountryCodeChange={handlePhoneNumberChange}
      onChange={handlePhoneNumberChange}
      placeholder={i18nLabel}
      isRequired
      {...attrs}
    />
  ) : (
    <TextField
      autoComplete="username"
      errorMessage={error}
      label={i18nLabel}
      labelHidden={true}
      name={inputFieldName}
      required
      placeholder={i18nLabel}
      isRequired
      type={type}
      {...attrs}
    />
  );
}
