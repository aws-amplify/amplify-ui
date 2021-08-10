import { useAuth } from '../../../hooks';

import { Label, Text, Input, ErrorText } from '../../../primitives';
import { getAliasInfoFromContext } from '@aws-amplify/ui-core';

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
      <Text>{label}</Text>
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
