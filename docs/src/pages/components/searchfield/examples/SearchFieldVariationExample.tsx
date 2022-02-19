import { SearchField, Flex } from '@aws-amplify/ui-react';

export const SearchFieldVariationExample = () => (
  <Flex direction="column">
    <SearchField label="search" />
    <SearchField label="search" variation="quiet" />
  </Flex>
);
