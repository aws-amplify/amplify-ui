import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { PaginationProps, Pagination } from '../../../composables/Pagination';

const defaultValue: PaginationProps = {};
export const { FoldersPaginationProvider, useFoldersPagination } =
  createContextUtilities({ contextName: 'FoldersPagination', defaultValue });

export const FoldersPaginatationControl = (): React.JSX.Element => {
  const props = useFoldersPagination();

  return <Pagination {...props} />;
};

FoldersPaginatationControl.displayName = 'FoldersPagination';
