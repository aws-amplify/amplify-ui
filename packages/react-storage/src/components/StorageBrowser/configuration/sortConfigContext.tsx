import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

/**
 * Controls where sorting is applied in the Storage Browser.
 *
 * - `'all'` — Sort all loaded items before pagination (cross-page sort).
 *   Headers are handled by the view-level `useSort` hook.
 * - `'page'` — Sort only the current display page. Headers are handled
 *   by the table-level local sort inside `useDataTable`.
 *
 * @default 'page'
 */
export type SortScope = 'all' | 'page';

export interface SortConfig {
  sortScope: SortScope;
}

const ERROR_MESSAGE =
  '`useSortConfig` must be called from within a `SortConfigProvider`.';

export const { useSortConfig, SortConfigContext } =
  createContextUtilities<SortConfig>({
    contextName: 'SortConfig',
    errorMessage: ERROR_MESSAGE,
  });

export interface SortConfigProviderProps {
  children?: React.ReactNode;
  sortScope?: SortScope;
}

export function SortConfigProvider({
  children,
  sortScope = 'page',
}: SortConfigProviderProps): React.JSX.Element {
  const value = React.useMemo(() => ({ sortScope }), [sortScope]);

  return (
    <SortConfigContext.Provider value={value}>
      {children}
    </SortConfigContext.Provider>
  );
}
