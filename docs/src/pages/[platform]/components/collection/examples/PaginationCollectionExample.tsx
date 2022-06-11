import { Collection, Button } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const PaginationCollectionExample = () => {
  return (
    <Collection
      type="list"
      direction="row"
      wrap="wrap"
      items={Object.values(countries).map(({ name, emoji }) => ({
        name,
        emoji,
      }))}
      isPaginated
      itemsPerPage={12}
    >
      {(regions, index) => (
        <Button grow="1" key={index}>
          {regions.emoji} {regions.name}
        </Button>
      )}
    </Collection>
  );
};
