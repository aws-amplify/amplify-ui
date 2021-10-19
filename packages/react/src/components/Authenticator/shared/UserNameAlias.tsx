import { useEffect } from 'react';
import {
  ActorContextWithForms,
  UserNameAlias,
  getActorContext,
  getAliasInfoFromContext,
  translate,
} from '@aws-amplify/ui';

import { PhoneNumberField, TextField } from '../../../primitives';
import { useAuthenticator } from '../../../hooks';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  alias?: UserNameAlias;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { handleInputChange, alias, ...attrs } = props;
  const [_state, send] = useAuthenticator();

  const { country_code }: ActorContextWithForms = getActorContext(_state);
  const { label, type, error } = getAliasInfoFromContext(_state.context, alias);
  const i18nLabel = translate<string>(label);

  const isPhoneAlias = type === 'tel';

  useEffect(() => {
    isPhoneAlias &&
      send({
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
