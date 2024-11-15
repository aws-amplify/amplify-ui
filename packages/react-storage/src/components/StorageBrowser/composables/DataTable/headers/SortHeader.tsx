import React from 'react';

import { ButtonElement, IconElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../../constants';

import { SortDirection } from '../types';

export type SortHeaderProps = {
  content: {
    label?: string;
    sortDirection?: SortDirection;
    onSort?: () => void;
  };
};

export const SortHeader = ({ content }: SortHeaderProps): React.JSX.Element => {
  const { label, sortDirection, onSort } = content;
  return (
    <ButtonElement
      variant="sort"
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-sort-header`}
      onClick={onSort}
    >
      {label}
      <IconElement variant={`sort-${sortDirection ?? 'indeterminate'}`} />
    </ButtonElement>
  );
};
