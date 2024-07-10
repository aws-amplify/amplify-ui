import React from 'react';

/**
 * Base type definition of `BaseElement` components available through
 * `ElementsContext`. The definitions define a contract between a
 * Connected Component and the `elements` that can be provided as
 * overrides.
 *
 * `BaseElement` interfaces surface a minimal set of HTML semantic `props`
 * required to achieve the base functionality of consumers. `props`
 * are always optional at the interface level, allowing for additional `props`
 * to be added to existing `BaseElement` interfaces as needed.
 */
export type BaseElement<T = {}, K = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T> & React.RefAttributes<K>
>;

/**
 * allowed values of `displayName` of `BaseElement` and `ElemebtsContext` keys
 */
export type ElementDisplayName =
  | 'Button'
  | 'View'
  | 'Icon'
  | 'Image'
  | 'Input'
  | 'Span'
  | 'Paragraph';

export type ElementRefType<T> = T extends {
  ref?:
    | React.LegacyRef<infer K>
    | React.Ref<infer K>
    | React.ForwardedRef<infer K>;
}
  ? K
  : never;

export type ReactElementType = keyof React.JSX.IntrinsicElements;
export type ReactElementProps<T extends ReactElementType> =
  React.JSX.IntrinsicElements[T];

/**
 * key of `props` always available on `BaseElement` definitions
 */
type ElementPropKey<T> = T | 'children' | 'className' | 'style';

export type BaseElementProps<
  T extends keyof K,
  V = string,
  K extends Record<ElementPropKey<keyof K>, any> = Record<string, any>,
> = React.AriaAttributes &
  React.RefAttributes<ElementRefType<K>> &
  Pick<K, ElementPropKey<T>> & { testId?: string; variant?: V };
