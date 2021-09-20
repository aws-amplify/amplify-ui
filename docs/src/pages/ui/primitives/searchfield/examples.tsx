import * as React from 'react';
import { SearchField, Text } from '@aws-amplify/ui-react';

export const SearchFieldStyledPropsExample = () => (
  <SearchField
    label="search"
    fontSize="var(--amplify-font-sizes-xl)"
    backgroundColor="var(--amplify-colors-blue-20)"
    color="var(--amplify-colors-black)"
  />
);
