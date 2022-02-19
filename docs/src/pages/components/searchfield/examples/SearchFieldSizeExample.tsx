import { SearchField, Flex } from '@aws-amplify/ui-react';

export const SearchFieldSizeExample = () => (
  <Flex direction="column">
    <SearchField label="search" size="small" />
    <SearchField label="search" />
    <SearchField label="search" size="large" />
  </Flex>
);
