import { Autocomplete } from '@aws-amplify/ui-react';
import * as React from 'react';

const options = [];

export const AutocompleteLoadingStateExample = () => {
  return (
    <Autocomplete
      label="Autocomplete in loading state"
      options={options}
      isLoading
    />
  );
};
