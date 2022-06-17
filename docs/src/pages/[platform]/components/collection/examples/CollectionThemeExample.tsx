import {
  Button,
  Collection,
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
              value: '{colors.blue.80}',
            },
          },
          button: {
            color: { value: '{colors.blue.60}' },
            _hover: {
              backgroundColor: {
                value: '{colors.blue.10}',
              },
              color: { value: '{colors.blue.60}' },
            },
          },
        },
        search: {
          input: {
            color: { value: '{colors.blue.60}' },
          },
          button: {
            color: { value: '{colors.blue.60}' },
            _focus: {
              backgroundColor: {
                value: '{colors.blue.60}',
              },
              color: {
                value: 'white',
              },
            },
            _hover: {
              backgroundColor: {
                value: '{colors.blue.80}',
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
};

export const CollectionThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
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
