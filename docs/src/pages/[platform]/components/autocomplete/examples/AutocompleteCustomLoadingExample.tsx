import { Autocomplete, Flex, Loader } from '@aws-amplify/ui-react';
import * as React from 'react';

export const AutocompleteCustomLoadingExample = () => (
  <Autocomplete
    label="Autocomplete custom loading example"
    options={[]}
    menuSlots={{
      LoadingIndicator: (
        <Flex alignItems="center" gap="0.25rem">
          <Loader />
          Loading more cats...
        </Flex>
      ),
    }}
    isLoading={true}
  />
);
