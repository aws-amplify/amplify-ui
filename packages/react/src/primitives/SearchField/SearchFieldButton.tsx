import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconSearch } from '../Icon';
import { PrimitiveWithForwardRef, SearchFieldButtonProps } from '../types';
import { SharedText } from '../shared/i18n';

const ariaLabelText = SharedText.SearchField.ariaLabel.search;

const SearchFieldButtonPrimitive: PrimitiveWithForwardRef<
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
