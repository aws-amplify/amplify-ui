import * as React from 'react';

import { ComponentClassNames, ComponentText } from '../shared/constants';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconSearch } from '../Icon/internal';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseSearchFieldButtonProps,
} from '../types';

const ariaLabelText = ComponentText.SearchField.searchButtonLabel;

const SearchFieldButtonPrimitive: Primitive<
  BaseSearchFieldButtonProps,
  'button'
> = ({ size, ...props }, ref) => {
  return (
    <FieldGroupIconButton
      ariaLabel={ariaLabelText}
      className={ComponentClassNames.SearchFieldSearch}
      size={size}
      ref={ref}
      type="submit"
      {...props}
    >
      <IconSearch />
    </FieldGroupIconButton>
  );
};

export const SearchFieldButton = React.forwardRef(
  SearchFieldButtonPrimitive
) as ForwardRefPrimitive<BaseSearchFieldButtonProps, 'button'>;

SearchFieldButton.displayName = 'SearchFieldButton';
