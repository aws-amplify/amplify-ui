import * as React from 'react';

import {
  Flex,
  FlexStyleProps,
  SearchField,
  SearchFieldProps,
  View,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { GetFieldControls } from '@/components/GetFieldControls';
import { useFlexStyleProps } from '@/components/useFlexStyleProps';
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

  return (
    <View width="100%">
      <SearchFieldPropControls {...searchFieldProps} />
      <Example>
        <View maxWidth="500px" padding="2rem">
          <Flex gap="2rem" direction="column">
            <SearchField
              isDisabled={searchFieldProps.isDisabled as unknown as boolean}
              label={searchFieldProps.label as SearchFieldProps['label']}
              labelHidden={searchFieldProps.labelHidden as unknown as boolean}
              placeholder={
                searchFieldProps.placeholder as SearchFieldProps['placeholder']
              }
              size={searchFieldProps.size as SearchFieldProps['size']}
              variation={
                searchFieldProps.variation as SearchFieldProps['variation']
              }
            />
          </Flex>
        </View>
      </Example>
    </View>
  );
};
