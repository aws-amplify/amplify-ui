import React from 'react';

import { isFunction } from '@aws-amplify/ui';

/**
 * @internal @experimental
 */
export type WithContext = <
  T extends React.ComponentType<any>,
  K extends React.ComponentProps<T>,
  U,
>(
  Component: T,
  Context: React.Context<U>,
  options?: {
    displayName?: string;
    resolveProps?: (props: K, context: U) => K;
  }
) => (props: K) => React.JSX.Element;

/**
 * @internal @experimental
 */
export const withContext: WithContext = (Component, Context, options) => {
  const { displayName, resolveProps } = options ?? {};

  const WrappedComponent = (props: React.ComponentProps<typeof Component>) => {
    const context = React.useContext(Context);
    return (
      <Component
        {...(!isFunction(resolveProps) ? props : resolveProps(props, context))}
      />
    );
  };

  WrappedComponent.displayName = displayName ?? Component.displayName;
  return WrappedComponent;
};
