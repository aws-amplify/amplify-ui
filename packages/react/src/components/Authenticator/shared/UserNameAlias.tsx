import {
  ActorContextWithForms,
  getActorContext,
  getAliasInfoFromContext,
  LoginMechanism,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { PhoneNumberField, TextField } from '../../..';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  alias?: LoginMechanism;
  labelHidden?: boolean;
  label?: string;
  placeholder?: string | null;
  required?: boolean;
  dialCode?: string;
  dialCodeList?: Array<string>;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const {
    handleInputChange,
    alias,
    label: _label,
    placeholder,
    labelHidden,
    dialCode,
    dialCodeList,
    required,
    ...attrs
  } = props;
  const { _state } = useAuthenticator();

  const { country_code }: ActorContextWithForms = getActorContext(_state);
  const { label, type, error } = getAliasInfoFromContext(_state.context, alias);
  const i18nLabel = _label ?? translate<string>(label);
  const _placeholder = placeholder ?? i18nLabel;

  const isPhoneAlias = type === 'tel';

  return isPhoneAlias ? (
    <PhoneNumberField
      autoComplete="username"
      countryCodeName="country_code"
      defaultCountryCode={dialCode ?? country_code}
      dialCodeList={dialCodeList}
      errorMessage={error}
      label={i18nLabel}
      labelHidden={labelHidden ?? true}
      name={alias ?? 'username'}
      onChange={handleInputChange}
      placeholder={_placeholder}
      isRequired={required ?? true}
      {...attrs}
    />
  ) : (
    <TextField
      autoComplete="username"
      errorMessage={error}
      label={i18nLabel}
      labelHidden={labelHidden ?? true}
      name={alias ?? 'username'}
      placeholder={_placeholder}
      isRequired={required ?? true}
      type={type}
      {...attrs}
    />
  );
}
