import * as React from 'react';
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcMinus,
  FcNext,
  FcPrevious,
  FcRefresh,
  FcSearch,
} from 'react-icons/fc';
import { StorageBrowser } from './StorageBrowser'; // IGNORE
import { IconsProvider } from '@aws-amplify/ui-react';

export default function Example() {
  return (
    <IconsProvider
      icons={{
        storageBrowser: {
          refresh: <FcRefresh />,
          'sort-indeterminate': <FcMinus />,
          'sort-ascending': <FcAlphabeticalSortingAz />,
          'sort-descending': <FcAlphabeticalSortingZa />,
        },
        searchField: {
          search: <FcSearch />,
        },
        pagination: {
          next: <FcNext />,
          previous: <FcPrevious />,
        },
      }}
    >
      <StorageBrowser />
    </IconsProvider>
  );
}
