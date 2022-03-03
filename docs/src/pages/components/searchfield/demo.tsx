import * as React from 'react';

import { SearchField } from '@aws-amplify/ui-react';
import { useSearchFieldProps } from './useSearchFieldProps';
import { SearchFieldPropControls } from './SearchFieldPropControls';
import { Demo } from '@/components/Demo';

const propsToCode = (searchFieldProps) => {
  return (
    `<SearchField` +
    `\n  label=${JSON.stringify(searchFieldProps.label)}` +
    (searchFieldProps.placeholder
      ? `\n  placeholder=${JSON.stringify(searchFieldProps.placeholder)}`
      : '') +
    (searchFieldProps.size
      ? `\n  size=${JSON.stringify(searchFieldProps.size)}`
      : '') +
    (searchFieldProps.variation
      ? `\n  variation=${JSON.stringify(searchFieldProps.variation)}`
      : '') +
    (!searchFieldProps.labelHidden
      ? `\n  isLabelHidden={${JSON.stringify(searchFieldProps.labelHidden)}}`
      : '') +
    (searchFieldProps.isDisabled
      ? `\n  isDisabled={${JSON.stringify(searchFieldProps.isDisabled)}}`
      : '') +
    `\n/>`
  );
};

export const SearchFieldDemo = () => {
  const searchFieldProps = useSearchFieldProps({
    isDisabled: false,
    isLabelHidden: true,
    label: 'Search',
    placeholder: 'Search here...',
    size: null,
    variation: null,
  });

  const onSubmit = React.useCallback(
    (value) => alert(`you searched for ${value}`),
    []
  );

  return (
    <Demo
      code={propsToCode(searchFieldProps)}
      propControls={<SearchFieldPropControls {...searchFieldProps} />}
    >
      <SearchField
        label={searchFieldProps.label}
        placeholder={searchFieldProps.placeholder}
        size={searchFieldProps.size}
        variation={searchFieldProps.variation}
        isLabelHidden={searchFieldProps.isLabelHidden}
        isDisabled={searchFieldProps.isDisabled}
        onSubmit={onSubmit}
      />
    </Demo>
  );
};
