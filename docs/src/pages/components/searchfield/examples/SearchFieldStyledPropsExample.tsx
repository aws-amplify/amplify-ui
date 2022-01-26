import * as React from 'react';
import { SearchField, useTheme } from '@aws-amplify/ui-react';

export const SearchFieldStyledPropsExample = () => {
  const { tokens } = useTheme();

  return (
    <SearchField
      label="search"
      fontSize={tokens.fontSizes.xl}
      backgroundColor={tokens.colors.blue[20]}
      color={tokens.colors.black}
    />
  );
};
