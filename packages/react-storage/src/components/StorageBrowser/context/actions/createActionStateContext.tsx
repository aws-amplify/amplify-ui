import React from 'react';

import {
  DataAction,
  DataState,
  useDataState,
} from '@aws-amplify/ui-react-core';

type ContextProvider = (props: {
  children?: React.ReactNode;
}) => React.JSX.Element;

export type ActionState<T = any, K = any> = [
  state: DataState<T>,
  handleAction: (...input: K[]) => void,
];

interface ActionContext<X = any, Y = any> {
  Context: React.Context<ActionState<X, Y> | undefined>;
  Provider: ContextProvider;
}

type DataActions = { [key: string]: DataAction };

type ActionContexts<T> = {
  [K in keyof T]: T[K] extends DataAction<infer X, infer Y>
    ? ActionContext<X, Y>
    : never;
};

type InitialValue<T> = {
  [K in keyof T]: T[K] extends DataAction<infer X> ? X : never;
};

type ActionsState<T> = {
  [K in keyof T]: T[K] extends DataAction<infer X, infer U>
    ? ActionState<X, U>
    : never;
};

export type UseAction<T> = <U extends keyof T>(input: {
  type: U;
}) => ActionsState<T>[U];

export interface ActionProviderProps<T> {
  children?: React.ReactNode;
  initialValue: T;
}

type ActionProvider<T> = (props: ActionProviderProps<T>) => React.JSX.Element;

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
    const value = useDataState(action, initialValue?.[type]);
    return <ActionContext.Provider {...props} value={value} />;
  }

  return { Provider, Context: ActionContext };
}

export function createActionProvider<T>(
  contexts: ActionContexts<T>
): ActionProvider<InitialValue<T>> {
  const ComposedActionProvider = Object.values<ActionContext>(contexts).reduce(
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
    return context as ActionsState<T>[K];
  };
}

const createContexts = <T extends DataActions>(actions: T) =>
  Object.entries(actions).reduce(
    (acc, [type, action]) => ({
      ...acc,
      [type]: createActionContext(action, type),
    }),
    {} as ActionContexts<T>
  );

export type ActionStateContext<T> = [
  Provider: ActionProvider<InitialValue<T>>,
  useAction: UseAction<T>,
];

export function createActionStateContext<T extends DataActions>(
  actions: T,
  errorMessage: string
): ActionStateContext<T> {
  const contexts = createContexts(actions);

  return [
    createActionProvider(contexts),
    createUseAction(contexts, errorMessage),
  ];
}
