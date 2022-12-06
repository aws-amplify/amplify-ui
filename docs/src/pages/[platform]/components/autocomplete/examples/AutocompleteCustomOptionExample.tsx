import {
  Autocomplete,
  Flex,
  HighlightMatch,
  Image,
} from '@aws-amplify/ui-react';
import * as React from 'react';

// When you run the code locally, you need to update the url with yours.
const options = [
  { id: 'cat-1', label: 'cat-1', url: '/cats/1.jpg' },
  { id: 'cat-2', label: 'cat-2', url: '/cats/2.jpg' },
  { id: 'cat-3', label: 'cat-3', url: '/cats/3.jpg' },
  { id: 'cat-4', label: 'cat-4', url: '/cats/4.jpg' },
  { id: 'cat-5', label: 'cat-5', url: '/cats/5.jpg' },
];

export const AutocompleteCustomOptionExample = () => {
  const renderOption = (option, value) => {
    const { label, url } = option;
    return (
      <Flex alignItems="center">
        <Image src={url} alt={label} width="100px" height="100px" />
        <HighlightMatch query={value}>{label}</HighlightMatch>
      </Flex>
    );
  };

  return (
    <Autocomplete
      label="Autocomplete with custom options"
      options={options}
      renderOption={renderOption}
    />
  );
};
