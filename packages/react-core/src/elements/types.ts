import React from 'react';

/**
 * @internal @unstable
 *
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

type ListElementSubType = 'Ordered' | 'Unordered';
type ListElementDisplayName = 'List' | `${ListElementSubType}List`;

type TableElementSubType = 'Body' | 'Data' | 'Row' | 'Head' | 'Header';
type TableElementDisplayName = 'Table' | `Table${TableElementSubType}`;

/**
 * @internal @unstable
 *
 * allowed values of `displayName` of `BaseElement` and `ElemebtsContext` keys
 */
export type ElementDisplayName =
  | 'Button'
  | 'Divider'
  | 'Heading' // h1, h2, etc
  | 'Icon'
  | 'Image'
  | 'Input'
  | 'Label'
  | 'ListItem'
  | 'Nav'
  | 'ProgressBar'
  | 'Span'
  | 'Text'
  | 'TextArea'
  | 'Title'
  | 'View'
  | ListElementDisplayName
  | TableElementDisplayName;

/**
 * @internal @unstable
 */
export type ElementRefType<T> = T extends {
  ref?:
    | React.LegacyRef<infer K>
    | React.Ref<infer K>
    | React.ForwardedRef<infer K>;
}
  ? K
  : never;

/**
 * @internal @unstable
 */
export type ReactElementType = keyof React.JSX.IntrinsicElements;

/**
 * @internal @unstable
 */
export type ReactElementProps<T extends ReactElementType> =
  React.JSX.IntrinsicElements[T];

/**
 * @internal @unstable
 *
 * key of `props` always available on `BaseElement` definitions
 */
type ElementPropKey<T> = T | 'children' | 'className' | 'style';

/**
 * @internal @unstable
 */
export type BaseElementProps<
  T extends keyof K,
  V = string,
  K extends Record<ElementPropKey<keyof K>, any> = Record<string, any>,
> = React.AriaAttributes &
  React.RefAttributes<ElementRefType<K>> &
  Pick<K, ElementPropKey<T>> & { testId?: string; variant?: V };
