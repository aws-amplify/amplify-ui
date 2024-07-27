import React from 'react';

import {
  DataAction,
  DataState,
  useDataState,
} from '@aws-amplify/ui-react-core';

type ActionState<T, K> = [
  state: DataState<T>,
  handleAction: (...input: K[]) => void,
];

type ActionProvider<T> = (props: ActionProviderProps<T>) => React.JSX.Element;

type ContextProvider = (props: {
  children?: React.ReactNode;
}) => React.JSX.Element;

type InitialValue<T> = {
  [K in keyof T]: T[K] extends DataAction<infer X> ? X : never;
};

export type DataActions<T = DataAction> = {
  [K in keyof T]: T[K] extends DataAction<infer X, infer U>
    ? ActionState<X, U>
    : never;
};

export type UseAction<T> = <U extends keyof T>(input: {
  type: U;
}) => DataActions<T>[U];

export interface ActionProviderProps<T> {
  children?: React.ReactNode;
  initialValue: T;
}

interface ActionContext<X, Y> {
  Context: React.Context<ActionState<X, Y> | undefined>;
  Provider: ContextProvider;
}

const InitialValue = React.createContext<Record<PropertyKey, any> | undefined>(
  undefined
);
function InitialValueProvider<T extends Record<PropertyKey, any>>({
  children,
  initialValue,
}: ActionProviderProps<T>) {
  return (
    <InitialValue.Provider value={initialValue}>
      {children}
    </InitialValue.Provider>
  );
}

function createActionContext<T, K>(action: DataAction<T, K>, type: string) {
  const ActionContext = React.createContext<
    [DataState<T>, (...input: K[]) => void] | undefined
  >(undefined);

  function Provider(props: { children?: React.ReactNode }) {
    const initialValue = React.useContext(InitialValue);
    const value = useDataState(action, initialValue?.[type] as T);
    return <ActionContext.Provider {...props} value={value} />;
  }

  return { Provider, Context: ActionContext };
}

type ActionContexts<T> = {
  [K in keyof T]: T[K] extends DataAction<infer X, infer Y>
    ? ActionContext<X, Y>
    : never;
};

export function createActionProvider<T>(
  contexts: ActionContexts<T>
): ActionProvider<InitialValue<T>> {
  const ComposedActionProvider = Object.values<ActionContext<any, any>>(
    contexts
  ).reduce(
    (Wrapper, { Provider }) =>
      function ActionProvider({
        children,
      }: {
        children?: React.ReactNode;
      }): React.JSX.Element {
        return (
          <Wrapper>
            <Provider>{children}</Provider>
          </Wrapper>
        );
      },
    ({ children }: { children?: React.ReactNode }): React.JSX.Element => (
      <>{children}</>
    )
  );

  return function ActionProvider({
    children,
    ...props
  }: ActionProviderProps<InitialValue<T>>): React.JSX.Element {
    return (
      <InitialValueProvider {...props}>
        <ComposedActionProvider>{children}</ComposedActionProvider>
      </InitialValueProvider>
    );
  };
}

export function createUseAction<T>(
  contexts: ActionContexts<T>,
  errorMessage: string
): UseAction<T> {
  return function useAction<K extends keyof T>({ type }: { type: K }) {
    const context = React.useContext(contexts[type].Context);
    if (!context) {
      throw new Error(errorMessage);
    }
    return context as DataActions<T>[K];
  };
}

const createContexts = <T extends { [key: string]: DataAction }>(actions: T) =>
  Object.entries(actions).reduce(
    (acc, [type, action]) => ({
      ...acc,
      [type]: createActionContext(action, type),
    }),
    {} as ActionContexts<T>
  );

export function createActionStateContext<
  T extends { [key: string]: DataAction },
>(
  actions: T,
  errorMessage: string
): [Provider: ActionProvider<InitialValue<T>>, useAction: UseAction<T>] {
  const contexts = createContexts(actions);

  return [
    createActionProvider(contexts),
    createUseAction(contexts, errorMessage),
  ];
}
