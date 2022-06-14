import * as React from 'react';

import { ComponentClassNames, ComponentText } from '../shared/constants';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconSearch } from '../Icon/internal';
import { Primitive, SearchFieldButtonProps } from '../types';

const ariaLabelText = ComponentText.SearchField.searchButtonLabel;

const SearchFieldButtonPrimitive: Primitive<
  SearchFieldButtonProps,
  'button'
> = (props, ref) => {
  return (
    <FieldGroupIconButton
      ariaLabel={ariaLabelText}
      className={ComponentClassNames.SearchFieldSearch}
      ref={ref}
      type="submit"
      {...props}
    >
      <IconSearch size={props.size} />
    </FieldGroupIconButton>
  );
};

export const SearchFieldButton = React.forwardRef(SearchFieldButtonPrimitive);

SearchFieldButton.displayName = 'SearchFieldButton';
