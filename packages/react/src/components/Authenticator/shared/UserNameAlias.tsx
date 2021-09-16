import { useEffect } from 'react';
import { I18n } from 'aws-amplify';
import {
  ActorContextWithForms,
  UserNameAlias,
  countryDialCodes,
  getActorContext,
  getAliasInfoFromContext,
} from '@aws-amplify/ui';

import { useAuth } from '../../../hooks';
import { SelectField, TextField } from '../../../primitives';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  alias?: UserNameAlias;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { handleInputChange, alias, ...attrs } = props;
  const [_state, send] = useAuth();

  const actorContext: ActorContextWithForms = getActorContext(_state);
  const { label, type, error } = getAliasInfoFromContext(_state.context, alias);
  const i18nLabel = I18n.get(label);

  const isPhoneAlias = type === 'tel';

  useEffect(() => {
    isPhoneAlias &&
      send({
        type: 'CHANGE',
        data: { name: 'country_code', value: actorContext.country_code },
      });
  }, []);

  return (
    <>
      {isPhoneAlias && (
        <SelectField
          name="country_code"
          label="country code"
          labelHidden={true}
          defaultValue={actorContext.country_code}
        >
          {countryDialCodes.map((dialCode) => (
            <option key={dialCode} value={dialCode}>
              {dialCode}
            </option>
          ))}
        </SelectField>
      )}
      <TextField
        type={type}
        name={alias ?? 'username'}
        required
        placeholder={i18nLabel}
        label={label}
        labelHidden={true}
        autoComplete="username"
        errorMessage={error}
        {...attrs}
      />
    </>
  );
}
