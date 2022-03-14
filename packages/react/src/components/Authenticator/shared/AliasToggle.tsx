import * as React from 'react';

import {
  Flex,
  ToggleButtonGroup,
  ToggleButton,
  Text,
} from '../../../primitives';
import { words, capitalize } from 'lodash';

export interface AliasToggleProps {
  toggles: string[];
  onChange: (value: string) => void;
}
export const AliasToggle = ({ toggles, onChange }: AliasToggleProps) => {
  const [currentAlias, setCurrentAlias] = React.useState<string>(toggles?.[0]);

  if (!(toggles?.length > 1)) return null;

  const handleChange = (val: string) => {
    setCurrentAlias(val);
    onChange(val);
  };

  return (
    <Flex alignItems="baseline">
      <Text>Login with</Text>

      <ToggleButtonGroup
        isExclusive
        onChange={handleChange}
        value={currentAlias}
      >
        {toggles.map((alias) => (
          <ToggleButton key={alias} value={alias}>
            <Text fontSize="small">
              {words(alias).map(capitalize).join(' ')}
            </Text>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Flex>
  );
};
