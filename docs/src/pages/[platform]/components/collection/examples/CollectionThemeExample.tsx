import {
  Button,
  Collection,
  defaultDarkModeOverride,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';
import { countries } from 'countries-list';

const theme: Theme = {
  name: 'collection-theme',
  tokens: {
    components: {
      collection: {
        pagination: {
          current: {
            color: { value: 'white' },
            backgroundColor: {
              value: '{colors.red.40}',
            },
          },
          button: {
            color: { value: '{colors.red.60}' },
            _hover: {
              backgroundColor: {
                value: '{colors.neutral.40}',
              },
              color: { value: 'white' },
            },
          },
        },
        search: {
          input: {
            color: { value: '{colors.red.60}' },
          },
          button: {
            color: { value: '{colors.red.60}' },
            _focus: {
              backgroundColor: {
                value: '{colors.red.20}',
              },
              color: {
                value: 'white',
              },
            },
            _hover: {
              backgroundColor: {
                value: '{colors.red.40}',
              },
              color: {
                value: 'white',
              },
            },
          },
        },
      },
    },
  },
  overrides: [defaultDarkModeOverride],
};

export const CollectionThemeExample = () => {
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
