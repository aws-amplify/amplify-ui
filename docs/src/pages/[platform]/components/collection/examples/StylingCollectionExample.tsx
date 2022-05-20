import { Collection, Button } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const StylingCollectionExample = () => {
  return (
    <Collection
      type="list"
      direction="row"
      wrap="wrap"
      gap="20px"
      padding="5px"
      className="collection-styling-example"
      items={Object.values(countries)
        .map(({ name, emoji }) => ({
          name,
          emoji,
        }))
        .splice(0, 20)}
    >
      {(regions, index) => (
        <Button grow="1" key={index}>
          {regions.emoji}
        </Button>
      )}
    </Collection>
  );
};
