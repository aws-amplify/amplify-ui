import React from 'react';

import { useComposables } from '../composables/context';
import { ComposableTypes } from '../composables/types';

export function resolveComposable<
  T extends React.ComponentType<any>,
  K extends keyof ComposableTypes,
>(
  DefaultComposable: T,
  name: K
): (props: React.ComponentProps<T>) => React.JSX.Element {
  const Component = (props: React.ComponentProps<T>) => {
    const { composables } = useComposables();
    const ResolvedComposable = composables?.[name] ?? DefaultComposable;
    return <ResolvedComposable {...props} />;
  };

  Component.displayName = name;
  return Component;
}
