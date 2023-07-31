import React from 'react';

import { isUndefined, isString } from '@aws-amplify/ui';

export const INVALID_OPTIONS_MESSAGE =
  'an `errorMessage` or a `defaultValue` must be provided in `options`';

type OptionsWithDefaultValue<ContextType extends {}> = {
  contextName: string;
  defaultValue: ContextType;
};

type OptionsWithErrorMessage = {
  contextName: string;
  errorMessage: string;
};

type ContextOptions<ContextType extends {}> =
  | OptionsWithDefaultValue<ContextType>
  | OptionsWithErrorMessage;

/**
 * Uses a `ContextType` generic to create:
 * - `Context`: React Context of type `ContextType`
 * - `Provider`: React Context `Provider` component exposing the `ContextType`
 *   as optional props
 * - `useContext`: Utility Hook exposing the values of `ContextType`
 *
 * @template ContextType Type definition of the Context.
 * > For most use cases the keys of `ContextType` should not be optional in
 * preference of explicit `undefined`
 *
 * @param options Context utility options. Requires a `contextName`, and either
 * a `defaultValue` of `ContextType` or `errorMessage` allowing for differing
 * behaviors of the Utility Hook when used outside a parent `Provider`:
 *
 * - `defaultValue`: Ensures the Utility Hook returns a default value for
 *   scenarios **where the missing context values should not impact usage**
 * - `errorMessage`: Ensures the Utility Hook throws an error for
 *   scenarios **where the missing context values should prevent** usage
 *
 * @returns `Context`, `Provider` Component and `useContext` Utility Hook
 *
 * @usage
 * ```ts
 * interface StuffContextType {
 *   things: number;
 * }
 *
 * // with `defaultValue`
 * const [StuffProvider, useStuff] = createContextUtilities<StuffContextType>({
 *   contextName: 'Stuff',
 *   defaultValue: { things: 7 }
 * });
 *
 * // with `errorMessage`
 * const [StuffProvider, useStuff] = createContextUtilities<StuffContextType>({
 *   contextName: 'Stuff',
 *   errorMessage: '`useStuff` must be used in a `StuffProvider`'
 * });
 * ```
 */
export default function createContextUtilities<ContextType extends {}>(
  options: ContextOptions<ContextType>
): {
  Provider: React.ComponentType<React.PropsWithChildren<Partial<ContextType>>>;
  useContext: () => ContextType;
  Context: React.Context<ContextType | undefined>;
} {
  const { contextName, defaultValue, errorMessage } =
    (options as {
      defaultValue: ContextType;
      errorMessage: string;
      contextName: string;
    }) ?? {};

  if (isUndefined(defaultValue) && !isString(errorMessage)) {
    throw new Error(INVALID_OPTIONS_MESSAGE);
  }

  const Context = React.createContext<ContextType | undefined>(defaultValue);

  function Provider(props: React.PropsWithChildren<Partial<ContextType>>) {
    const { children, ...context } = props;
    const value = React.useMemo(
      () => context,
      // Umpack `context` as the dep array as using `[context]` results in
      // evaluation on every render
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context)
    ) as ContextType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  Provider.displayName = `${contextName}Provider`;

  return {
    Context,
    Provider,
    useContext: function () {
      const context = React.useContext(Context);

      if (isUndefined(context)) {
        throw new Error(errorMessage);
      }

      return context;
    },
  };
}
