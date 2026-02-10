import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

export interface PaginationConfig {
  pageSize: number;
  isExplicitPageSize: boolean;
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
  isExplicitPageSize: boolean;
}

export function PaginationConfigProvider({
  children,
  pageSize,
  isExplicitPageSize,
}: PaginationConfigProviderProps): React.JSX.Element {
  const value = React.useMemo(
    () => ({ pageSize, isExplicitPageSize }),
    [pageSize, isExplicitPageSize]
  );

  return (
    <PaginationConfigContext.Provider value={value}>
      {children}
    </PaginationConfigContext.Provider>
  );
}
