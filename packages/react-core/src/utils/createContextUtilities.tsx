import React from 'react';

import { isUndefined, isString } from '@aws-amplify/ui';

export const INVALID_OPTIONS_MESSAGE =
  'an `errorMessage` or a `defaultValue` must be provided in `options`';

type ContextOptions<ContextType, ContextName extends string> = {
  contextName: ContextName;
} & (
  | // exclude `errorMessage` if `defaultValue` is present
  { defaultValue: ContextType; errorMessage?: never }
  // exclude `defaultValue` if `errorMessage` is present
  | { errorMessage: string; defaultValue?: never }
);

type UtilityKey<ContextName extends string> =
  | `${ContextName}Provider`
  | `use${ContextName}`
  | `${ContextName}Context`;

type CreateContextUtilitiesReturn<ContextType, ContextName extends string> = {
  [Key in UtilityKey<ContextName>]: Key extends `${string}Provider`
    ? React.ComponentType<React.PropsWithChildren<Partial<ContextType>>>
    : Key extends `use${string}`
    ? () => ContextType
    : Key extends `${string}Context`
    ? React.Context<ContextType | undefined>
    : never;
};

/**
 * Use a `ContextType` generic and `options` to create:
 * - `Context`: React Context of type `ContextType`
 * - `Provider`: React Context `Provider` component exposing the `ContextType`
 *   as optional props
 * - `useContext`: Utility Hook exposing the values of `ContextType`
 *
 * @template ContextType Type definition of the Context.
 * > For most use cases the keys of `ContextType` should not be optional in
 * preference of explicit `undefined` to avoid optional types on the
 * Utility Hook return
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
 * const { StuffProvider, useStuff } = createContextUtilities<StuffContextType>({
 *   contextName: 'Stuff',
 *   defaultValue: { things: 7 }
 * });
 *
 * // with `errorMessage`
 * const { StuffProvider, useStuff } = createContextUtilities<StuffContextType>({
 *   contextName: 'Stuff',
 *   errorMessage: '`useStuff` must be used in a `StuffProvider`'
 * });
 * ```
 */
export default function createContextUtilities<
  ContextType,
  ContextName extends string = string
>(
  options: ContextOptions<ContextType, ContextName>
): CreateContextUtilitiesReturn<ContextType, ContextName> {
  const { contextName, defaultValue, errorMessage } = options ?? {};

  if (isUndefined(defaultValue) && !isString(errorMessage)) {
    throw new Error(INVALID_OPTIONS_MESSAGE);
  }

  const Context = React.createContext<ContextType | undefined>(defaultValue);

  function Provider(props: React.PropsWithChildren<Partial<ContextType>>) {
    const { children, ...context } = props;
    const value = React.useMemo(
      () => context,
      // Unpack `context` for the dep array; using `[context]` results in
      // evaluation on every render
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context)
    ) as ContextType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  Provider.displayName = `${contextName}Provider`;

  return {
    [`use${contextName}`]: function () {
      const context = React.useContext(Context);

      if (isUndefined(context)) {
        throw new Error(errorMessage);
      }

      return context;
    },
    [`${contextName}Provider`]: Provider,
    [`${contextName}Context`]: Context,
  } as CreateContextUtilitiesReturn<ContextType, ContextName>;
}
