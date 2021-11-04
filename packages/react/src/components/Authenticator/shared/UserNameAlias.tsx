import {
  ActorContextWithForms,
  getActorContext,
  getAliasInfoFromContext,
  LoginMechanism,
  translate,
} from '@aws-amplify/ui';
import { useEffect } from 'react';

import { useAuthenticator } from '..';
import { PhoneNumberField, TextField } from '../../..';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  alias?: LoginMechanism;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { handleInputChange, alias, ...attrs } = props;
  const { _state, _send } = useAuthenticator();

  const { country_code }: ActorContextWithForms = getActorContext(_state);
  const { label, type, error } = getAliasInfoFromContext(_state.context, alias);
  const i18nLabel = translate<string>(label);

  const isPhoneAlias = type === 'tel';

  useEffect(() => {
    isPhoneAlias &&
      _send({
        type: 'CHANGE',
        data: { name: 'country_code', value: country_code },
      });
  }, []);

  return isPhoneAlias ? (
    <PhoneNumberField
      autoComplete="username"
      countryCodeName="country_code"
      defaultCountryCode={country_code}
      errorMessage={error}
      label={i18nLabel}
      labelHidden={true}
      name={alias ?? 'username'}
      onChange={handleInputChange}
      placeholder={i18nLabel}
      required
      {...attrs}
    />
  ) : (
    <TextField
      autoComplete="username"
      errorMessage={error}
      label={i18nLabel}
      labelHidden={true}
      name={alias ?? 'username'}
      required
      placeholder={i18nLabel}
      type={type}
      {...attrs}
    />
  );
}
