import { SearchField, Flex } from '@aws-amplify/ui-react';

export const VariationSearchFieldExample = () => (
  <Flex direction="column">
    <SearchField label="search" />
    <SearchField label="search" variation="quiet" />
  </Flex>
);
