import { Button, Collection, Theme } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const StylingCollectionExample = () => {
  return (
    <Collection
      type="grid"
      templateColumns="1fr 1fr 1fr"
      gap="15px"
      className="collection-styling-example"
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
