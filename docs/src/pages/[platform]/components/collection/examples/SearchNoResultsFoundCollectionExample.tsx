import { Collection, Button, Text, Flex } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const SearchNoResultsFoundCollectionExample = () => {
  return (
    <Collection
      type="grid"
      templateColumns="1fr 1fr 1fr"
      gap="15px"
      items={Object.values(countries).map(({ name, emoji }) => ({
        name,
        emoji,
      }))}
      isSearchable
      isPaginated
      itemsPerPage={9}
      searchNoResultsFound={
        <Flex justifyContent="center">
          <Text color="purple.80" fontSize="1rem">
            Nothing found, please try again
          </Text>
        </Flex>
      }
      searchPlaceholder="Type to search..."
      searchFilter={(regions, keyword) =>
        (regions as any).name.toLowerCase().startsWith(keyword.toLowerCase())
      }
    >
      {(regions, index) => (
        <Button grow="1" key={index}>
          {regions.emoji} {regions.name}
        </Button>
      )}
    </Collection>
  );
};
