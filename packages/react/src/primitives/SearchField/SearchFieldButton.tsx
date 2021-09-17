import * as React from 'react';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconSearch } from '../Icon';
import { SharedText } from '../shared/i18n';
import { SearchFieldButtonProps } from '../types';
import { ComponentClassNames } from '../shared/constants';

const ariaLabelText = SharedText.SearchField.ariaLabel.search;

export const SearchFieldButton: React.FC<SearchFieldButtonProps> = (props) => {
  return (
    <FieldGroupIconButton
      ariaLabel={ariaLabelText}
      className={ComponentClassNames.SearchFieldSearch}
      type="submit"
      {...props}
    >
      <IconSearch size={props.size} />
    </FieldGroupIconButton>
  );
};
