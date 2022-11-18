import * as React from 'react';
import { Autocomplete, AutocompleteProps } from '@aws-amplify/ui-react';

import { useAutocompleteProps } from './useAutocompleteProps';
import { AutocompletePropControls } from './AutocompletePropControls';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (autocompleteProps: AutocompleteProps) => {
  return (
    `<Autocomplete` +
    `\n  label=${JSON.stringify(autocompleteProps.label)}` +
    (autocompleteProps.options
      ? `\n  options={${JSON.stringify(autocompleteProps.options)}}`
      : '') +
    (autocompleteProps.placeholder
      ? `\n  placeholder=${JSON.stringify(autocompleteProps.placeholder)}`
      : '') +
    (autocompleteProps.size
      ? `\n  size=${JSON.stringify(autocompleteProps.size)}`
      : '') +
    (autocompleteProps.variation
      ? `\n  variation=${JSON.stringify(autocompleteProps.variation)}`
      : '') +
    (!autocompleteProps.labelHidden
      ? `\n  labelHidden={${JSON.stringify(autocompleteProps.labelHidden)}}`
      : '') +
    (autocompleteProps.isDisabled
      ? `\n  isDisabled={${JSON.stringify(autocompleteProps.isDisabled)}}`
      : '') +
    (autocompleteProps.isLoading
      ? `\n  isLoading={${JSON.stringify(autocompleteProps.isLoading)}}`
      : '') +
    `\n/>`
  );
};

const options = [
  { id: 'apple', label: 'apple' },
  { id: 'banana', label: 'banana' },
  { id: 'cherry', label: 'cherry' },
  { id: 'grape', label: 'grape' },
  { id: 'kiwis', label: 'kiwis' },
  { id: 'lemon', label: 'lemon' },
  { id: 'mango', label: 'mango' },
  { id: 'orange', label: 'orange' },
  { id: 'strawberry', label: 'strawberry' },
];

const defaultAutocompletedProps = {
  isDisabled: false,
  isLoading: false,
  label: 'Autocomplete',
  labelHidden: true,
  options,
  placeholder: 'Search here...',
  size: null,
  variation: null,
};

export const AutocompleteDemo = () => {
  const autocompleteProps = useAutocompleteProps(
    (demoState.get(Autocomplete.displayName) as AutocompleteProps) ||
      defaultAutocompletedProps
  );

  const onSubmit = React.useCallback(
    (value) => alert(`you searched for ${value}`),
    []
  );

  return (
    <Demo
      childrenOverflow="initial"
      code={propsToCode(autocompleteProps)}
      propControls={<AutocompletePropControls {...autocompleteProps} />}
    >
      <Autocomplete
        label={autocompleteProps.label}
        options={autocompleteProps.options}
        placeholder={autocompleteProps.placeholder}
        size={autocompleteProps.size}
        variation={autocompleteProps.variation}
        labelHidden={autocompleteProps.labelHidden}
        isDisabled={autocompleteProps.isDisabled}
        isLoading={autocompleteProps.isLoading}
        onSubmit={onSubmit}
      />
    </Demo>
  );
};
