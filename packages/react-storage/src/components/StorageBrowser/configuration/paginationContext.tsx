import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

export interface PaginationConfig {
  pageSize: number;
  showPagination: boolean;
}

const ERROR_MESSAGE =
  '`usePaginationConfig` must be called from within a `PaginationConfigProvider`.';

export const { usePaginationConfig, PaginationConfigContext } =
  createContextUtilities<PaginationConfig>({
    contextName: 'PaginationConfig',
    errorMessage: ERROR_MESSAGE,
  });

export interface PaginationConfigProviderProps {
  children?: React.ReactNode;
  pageSize: number;
  showPagination: boolean;
}

export function PaginationConfigProvider({
  children,
  pageSize,
  showPagination,
}: PaginationConfigProviderProps): React.JSX.Element {
  const value = React.useMemo(
    () => ({ pageSize, showPagination }),
    [pageSize, showPagination]
  );

  return (
    <PaginationConfigContext.Provider value={value}>
      {children}
    </PaginationConfigContext.Provider>
  );
}
