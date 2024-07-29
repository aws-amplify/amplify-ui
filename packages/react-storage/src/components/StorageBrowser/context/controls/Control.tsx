import React from 'react';
import { NavigateProvider, NavigateContext } from './Navigate';
import { PaginateProvider, PaginateContext } from './Paginate';

const CONTEXTS = {
  NAVIGATE: NavigateContext,
  PAGINATE: PaginateContext,
};

type Contexts = typeof CONTEXTS;

export function ControlProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <NavigateProvider>
      <PaginateProvider>{children}</PaginateProvider>
    </NavigateProvider>
  );
}

export function useControl<
  T extends keyof Contexts,
  K = Contexts[T] extends React.Context<infer U | undefined> ? U : never,
>({ type }: { type: T }): K {
  // TS does not handle the inference of the underlying `Context` type well
  // but ultimately this is a safe lookup
  // @ts-expect-error
  const context = React.useContext<K>(CONTEXTS[type]);

  if (!context) {
    throw new Error(
      '`useControl` can only be called from within `StorageBrowser.Provider`'
    );
  }

  return context;
}
