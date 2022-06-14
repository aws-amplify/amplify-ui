import { Collection, Button } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const SearchCollectionExample = () => {
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
