import React from 'react';

import { useComposables } from '../../components/composables/context';
import type { Composables } from '../../components/composables/types';

export function useResolvedComposable<
  T extends React.ComponentType<any>,
  K extends keyof Composables,
>(
  DefaultComposable: T,
  name: K
): (props: React.ComponentProps<T>) => React.JSX.Element {
  const { composables } = useComposables();
  const Composable = React.useMemo(() => {
    const ResolvedComposable = (props: React.ComponentProps<T>) => {
      const Resolved = composables?.[name] ?? DefaultComposable;
      return <Resolved {...props} />;
    };
    ResolvedComposable.displayName = name;
    return ResolvedComposable;
  }, [composables, DefaultComposable, name]);

  return Composable;
}
