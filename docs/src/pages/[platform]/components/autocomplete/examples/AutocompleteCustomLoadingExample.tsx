import { Autocomplete, Flex, Loader } from '@aws-amplify/ui-react';
import * as React from 'react';

export const AutocompleteCustomLoadingExample = () => (
  <Autocomplete
    label="Autocomplete custom loading example"
    options={[]}
    menu={{
      Loading: (
        <>
          <Loader />
          Loading more cats...
        </>
      ),
    }}
    isLoading={true}
  />
);
