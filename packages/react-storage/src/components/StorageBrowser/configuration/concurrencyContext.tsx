import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { DEFAULT_ACTION_CONCURRENCY } from '../useAction/constants';

export interface ConcurrencyConfig {
  concurrency: number;
}

const ERROR_MESSAGE =
  '`useConcurrencyConfig` must be called from within a `ConcurrencyConfigProvider`.';

export const { useConcurrencyConfig, ConcurrencyConfigContext } =
  createContextUtilities<ConcurrencyConfig>({
    contextName: 'ConcurrencyConfig',
    errorMessage: ERROR_MESSAGE,
  });

export interface ConcurrencyConfigProviderProps {
  children?: React.ReactNode;
  concurrency?: number;
}

export function ConcurrencyConfigProvider({
  children,
  concurrency,
}: ConcurrencyConfigProviderProps): React.JSX.Element {
  const value = React.useMemo(
    () => ({ concurrency: concurrency ?? DEFAULT_ACTION_CONCURRENCY }),
    [concurrency]
  );

  return (
    <ConcurrencyConfigContext.Provider value={value}>
      {children}
    </ConcurrencyConfigContext.Provider>
  );
}
