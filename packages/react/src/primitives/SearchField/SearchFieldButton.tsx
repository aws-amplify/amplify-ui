import * as React from 'react';

import { ComponentClassNames, ComponentText } from '../shared/constants';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseSearchFieldButtonProps,
  SearchFieldButtonProps,
} from '../types';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';

const ariaLabelText = ComponentText.SearchField.searchButtonLabel;

const SearchFieldButtonPrimitive: Primitive<SearchFieldButtonProps, 'button'> =
  ({ size, ...props }, ref) => {
    const { icons } = useTheme();
    return (
      <FieldGroupIconButton
        ariaLabel={ariaLabelText}
        className={ComponentClassNames.SearchFieldSearch}
        size={size}
        ref={ref}
        type="submit"
        {...props}
      >
        <Icon {...icons.searchField.search} />
      </FieldGroupIconButton>
    );
  };

export const SearchFieldButton: ForwardRefPrimitive<
  BaseSearchFieldButtonProps,
  'button'
> = React.forwardRef(SearchFieldButtonPrimitive);

SearchFieldButton.displayName = 'SearchFieldButton';
