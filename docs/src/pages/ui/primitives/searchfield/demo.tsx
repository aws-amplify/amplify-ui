import * as React from 'react';

import { Flex, SearchField, View } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { useSearchFieldProps } from '@/components/useSearchFieldProps';
import { SearchFieldPropControls } from '@/components/SearchFieldPropControls';

export const SearchFieldDemo = () => {
  const searchFieldProps = useSearchFieldProps({
    isDisabled: false,
    label: 'Search',
    labelHidden: true,
    placeholder: 'Search',
    size: null,
    variation: null,
  });

  const onSubmit = React.useCallback(
    (value) => alert(`you searched for ${value}`),
    []
  );

  return (
    <View width="100%">
      <SearchFieldPropControls {...searchFieldProps} />
      <Example>
        <View maxWidth="500px" padding="2rem">
          <Flex gap="2rem" direction="column">
            <SearchField
              isDisabled={searchFieldProps.isDisabled}
              label={searchFieldProps.label}
              labelHidden={searchFieldProps.labelHidden}
              placeholder={searchFieldProps.placeholder}
              size={searchFieldProps.size}
              variation={searchFieldProps.variation}
              onSubmit={onSubmit}
            />
          </Flex>
        </View>
      </Example>
    </View>
  );
};
