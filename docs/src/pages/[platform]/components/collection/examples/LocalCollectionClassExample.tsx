import { Collection, Button } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const LocalCollectionClassExample = () => {
  const items = Object.values(countries)
    .map(({ name, emoji }) => ({
      name,
      emoji,
    }))
    .splice(0, 20);
  return (
    <Collection
      type="list"
      className="collection-local-styling-example"
      direction="row"
      items={items}
    >
      {(regions, index) => (
        <Button grow="1" key={index}>
          {regions.emoji}
        </Button>
      )}
    </Collection>
  );
};
