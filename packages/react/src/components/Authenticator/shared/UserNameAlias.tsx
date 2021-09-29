import { useEffect } from 'react';
import { I18n } from 'aws-amplify';
import {
  ActorContextWithForms,
  UserNameAlias,
  getActorContext,
  getAliasInfoFromContext,
} from '@aws-amplify/ui';

import { useAuth } from '../../../hooks';
import { PhoneNumberField, TextField } from '../../../primitives';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  alias?: UserNameAlias;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { handleInputChange, alias, ...attrs } = props;
  const [_state, send] = useAuth();

  const { country_code }: ActorContextWithForms = getActorContext(_state);
  const { label, type, error } = getAliasInfoFromContext(_state.context, alias);
  const i18nLabel = I18n.get(label);

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
      className="phone-number-field"
      countryCodeName="country_code"
      defaultCountryCode={country_code}
      errorMessage={error}
      label={label}
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
      label={label}
      labelHidden={true}
      name={alias ?? 'username'}
      required
      placeholder={i18nLabel}
      type={type}
      {...attrs}
    />
  );
}
