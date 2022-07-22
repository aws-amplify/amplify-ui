import { Collection, Button, Text, Heading } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const NoResultsFoundPOC = () => {
  return (
    <>
      <Heading level={4}>Default</Heading>
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
      <Heading level={4}>Custom</Heading>
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
        noResultsFound={
          <Text color="purple.60" fontSize="2rem">
            Nothing found, please try again
          </Text>
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
    </>
  );
};
