import { I18n } from '@aws-amplify/core';
import { getAliasInfoFromContext } from '@aws-amplify/ui';

import { useAuth } from '../../../hooks';
import { Label, Text, Input, ErrorText } from '../../../primitives';

export interface UserNameAliasProps {
  handleInputChange?(event): void;
  [key: string]: any;
}

export function UserNameAlias(props: UserNameAliasProps) {
  const { handleInputChange, ...attrs } = props;
  const [{ context }] = useAuth();

  const { label, type, error } = getAliasInfoFromContext(context);

  return (
    <Label {...attrs}>
      <Text>{I18n.get(label)}</Text>
      <Input
        onChange={handleInputChange}
        name="username"
        required
        type={type}
      />
      <ErrorText>{error}</ErrorText>
    </Label>
  );
}
