import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

export interface PaginationConfig {
  pageSize: number;
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
}

export function PaginationConfigProvider({
  children,
  pageSize,
}: PaginationConfigProviderProps): React.JSX.Element {
  const value = React.useMemo(() => ({ pageSize }), [pageSize]);

  return (
    <PaginationConfigContext.Provider value={value}>
      {children}
    </PaginationConfigContext.Provider>
  );
}
