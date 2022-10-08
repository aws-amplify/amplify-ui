import classNames from 'classnames';
import * as React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import type { Primitive, SearchFieldSuggestionProps } from '../types';

export const SearchFieldSuggestion: Primitive<
  SearchFieldSuggestionProps,
  'li'
> = ({ children, className, ...rest }) => {
  return (
    <View
      as="li"
      role="option"
      className={classNames(
        ComponentClassNames.SearchFieldMenuSuggestion,
        className
      )}
      {...rest}
    >
      {children}
    </View>
  );
};

SearchFieldSuggestion.displayName = 'SearchFieldSuggestion';
