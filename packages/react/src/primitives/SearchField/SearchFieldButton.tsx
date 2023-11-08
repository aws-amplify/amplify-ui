import * as React from 'react';
import { ComponentClassName } from '@aws-amplify/ui';

import { ComponentText } from '../shared/constants';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconSearch, useIcons } from '../Icon';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseSearchFieldButtonProps,
  SearchFieldButtonProps,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const ariaLabelText = ComponentText.SearchField.searchButtonLabel;

const SearchFieldButtonPrimitive: Primitive<
  SearchFieldButtonProps,
  'button'
> = ({ size, ...props }, ref) => {
  const icons = useIcons('searchField');
  return (
    <FieldGroupIconButton
      ariaLabel={ariaLabelText}
      className={ComponentClassName.SearchFieldSearch}
      size={size}
      ref={ref}
      type="submit"
      {...props}
    >
      {icons?.search ?? <IconSearch />}
    </FieldGroupIconButton>
  );
};

export const SearchFieldButton: ForwardRefPrimitive<
  BaseSearchFieldButtonProps,
  'button'
> = primitiveWithForwardRef(SearchFieldButtonPrimitive);

SearchFieldButton.displayName = 'SearchFieldButton';
