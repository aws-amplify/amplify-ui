import React from 'react';

import { capitalize } from '@aws-amplify/ui';

import { ButtonElement, IconElement } from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

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
      className={`${CLASS_BASE}__table-sort-header`}
      onClick={onSort}
    >
      {label && capitalize(label)}
      <IconElement variant={`sort-${sortDirection ?? 'indeterminate'}`} />
    </ButtonElement>
  );
};
