import { SearchField, IconsProvider } from '@aws-amplify/ui-react';
import { FiSearch } from 'react-icons/fi';

export const SearchFieldIconExample = () => (
  <IconsProvider
    icons={{
      searchField: {
        search: <FiSearch />,
      },
    }}
  >
    <SearchField label="Password" />
  </IconsProvider>
);
