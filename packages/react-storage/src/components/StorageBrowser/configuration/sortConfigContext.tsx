import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

/**
 * Controls where sorting is applied in the Storage Browser.
 *
 * - `'page'` — Sort only the current display page. Headers are handled
 *   by the table-level local sort inside `useDataTable`.
 * - `'all'` — Sort all loaded items before pagination (cross-page sort).
 *   Headers are handled by the view-level `useSort` hook.
 * - `'global'` — Fetch ALL items from S3 (across all S3 pages, like
 *   search mode) before sorting. On first sort click, triggers a full
 *   fetch with progress reporting; subsequent sort changes reuse cached
 *   data. Cache invalidates on refresh or navigation.
 *
 * @default 'page'
 */
export type SortScope = 'page' | 'all' | 'global';

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
