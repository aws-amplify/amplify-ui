import * as React from 'react';

import { ComponentClassNames, ComponentText } from '../shared/constants';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconSearch } from '../Icon/internal';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseSearchFieldButtonProps,
  SearchFieldButtonProps,
} from '../types';
import { useIcons } from '../../hooks/useIcons';

const ariaLabelText = ComponentText.SearchField.searchButtonLabel;

const SearchFieldButtonPrimitive: Primitive<SearchFieldButtonProps, 'button'> =
  ({ size, ...props }, ref) => {
    const icons = useIcons();
    return (
      <FieldGroupIconButton
        ariaLabel={ariaLabelText}
        className={ComponentClassNames.SearchFieldSearch}
        size={size}
        ref={ref}
        type="submit"
        {...props}
      >
        {icons?.searchField?.search ?? <IconSearch />}
      </FieldGroupIconButton>
    );
  };

export const SearchFieldButton: ForwardRefPrimitive<
  BaseSearchFieldButtonProps,
  'button'
> = React.forwardRef(SearchFieldButtonPrimitive);

SearchFieldButton.displayName = 'SearchFieldButton';
