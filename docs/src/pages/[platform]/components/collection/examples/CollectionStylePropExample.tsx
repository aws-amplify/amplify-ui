import { Collection, Button, useTheme } from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const CollectionStylePropExample = () => {
  const { tokens } = useTheme();
  const items = Object.values(countries)
    .map(({ name, emoji }) => ({
      name,
      emoji,
    }))
    .splice(0, 20);
  return (
    <Collection
      type="list"
      border={`${tokens.borderWidths.medium} solid ${tokens.colors.red[60]}`}
      direction="row"
      wrap="wrap"
      padding="5px"
      gap="20px"
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
