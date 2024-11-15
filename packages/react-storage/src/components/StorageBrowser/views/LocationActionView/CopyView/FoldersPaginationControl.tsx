import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { PaginationProps, Pagination } from '../../../composables/Pagination';

const defaultValue: PaginationProps = {};
export const { FoldersPaginationProvider, useFoldersPagination } =
  createContextUtilities({ contextName: 'FoldersPagination', defaultValue });

export const FoldersPaginationControl = (): React.JSX.Element => {
  const props = useFoldersPagination();

  return <Pagination {...props} />;
};

FoldersPaginationControl.displayName = 'FoldersPagination';
