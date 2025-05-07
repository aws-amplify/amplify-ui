import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { PaginationProps } from '../../../components/composables/Pagination';
import { Pagination } from '../../../components/composables/Pagination';
import { useResolvedComposable } from '../../../controls/hooks/useResolvedComposable';

const defaultValue: PaginationProps = {};
export const { FoldersPaginationProvider, useFoldersPagination } =
  createContextUtilities({ contextName: 'FoldersPagination', defaultValue });

export const FoldersPaginationControl = (): React.JSX.Element => {
  const props = useFoldersPagination();
  const Resolved = useResolvedComposable(Pagination, 'Pagination');

  return <Resolved {...props} />;
};

FoldersPaginationControl.displayName = 'FoldersPagination';
