import * as React from 'react';
import { SearchField, useTheme } from '@aws-amplify/ui-react';

export const SearchFieldStylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <SearchField
      label="search"
      padding={tokens.space.medium}
      backgroundColor={tokens.colors.brand.primary[10]}
    />
  );
};
