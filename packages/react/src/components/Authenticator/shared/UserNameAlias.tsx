import { getAliasInfoFromContext } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import * as React from 'react';
import { useAuth } from '../../../hooks';
import { TextField } from '../../../primitives';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { handleInputChange, ...attrs } = props;
  const [{ context }] = useAuth();

  const { label, type, error } = getAliasInfoFromContext(context);
  const i18nLabel = I18n.get(label);

  return (
    <TextField
      type={type}
      onChange={handleInputChange}
      name="username"
      required
      placeholder={i18nLabel}
      label={i18nLabel}
      labelHidden={true}
      errorMessage={error}
      autoComplete="username"
      {...attrs}
    />
  );
}
