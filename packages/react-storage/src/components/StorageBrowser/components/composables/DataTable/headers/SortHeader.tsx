import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../base';
import { ButtonElement, IconElement } from '../../../elements';

import type { SortDirection } from '../types';

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
      className={`${STORAGE_BROWSER_BLOCK}__table-sort-header`}
      onClick={onSort}
    >
      {label}
      <IconElement variant={`sort-${sortDirection ?? 'indeterminate'}`} />
    </ButtonElement>
  );
};
