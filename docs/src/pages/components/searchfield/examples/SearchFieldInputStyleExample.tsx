import * as React from 'react';
import { SearchField, useTheme } from '@aws-amplify/ui-react';

export const SearchFieldInputStyleExample = () => {
  const { tokens } = useTheme();

  return (
    <SearchField
      label="search"
      labelHidden
      inputStyles={{
        backgroundColor: tokens.colors.background.disabled,
        border: `${tokens.borderWidths.large} solid ${tokens.colors.border.focus}`,
      }}
    />
  );
};
