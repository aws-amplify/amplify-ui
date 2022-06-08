import {
  Button,
  Collection,
  defaultDarkModeOverride,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

export const CollectionThemeExample = () => {
  const theme: Theme = {
    name: 'collection-theme',
    tokens: {
      components: {
        collection: {
          search: {
            button: {
              color: { value: '{colors.brand.secondary.40}' },
              _active: {
                backgroundColor: { value: '{colors.brand.primary.80}' },
              },
              _focus: {
                backgroundColor: { value: '{colors.brand.primary.80}' },
              },
              _hover: {
                backgroundColor: { value: '{colors.brand.primary.80}' },
              },
            },
          },
        },
      },
    },
    overrides: [defaultDarkModeOverride],
  };
  return (
    <ThemeProvider theme={theme} colorMode="system">
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
    </ThemeProvider>
  );
};
