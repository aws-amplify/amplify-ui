import type React from 'react';

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
export type BaseElement<T = {}> = (props: T) => React.JSX.Element;

/**
 * @internal @unstable
 *
 * see @type {BaseElement}
 *
 * `BaseElement` with a `ref` corresponding to the `element` type
 */
export type BaseElementWithRef<
  T = {},
  K = {},
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T> & React.RefAttributes<K>
>;

type ListElementSubType = 'Ordered' | 'Unordered';
type ListElementDisplayName = `${ListElementSubType}List`;

type TableElementSubType = 'Body' | 'DataCell' | 'Row' | 'Head' | 'Header';
type TableElementDisplayName = 'Table' | `Table${TableElementSubType}`;

type DescriptionElementSubType = 'Details' | 'List' | 'Term';
type DescriptionElementDisplayName = `Description${DescriptionElementSubType}`;

/**
 * @internal @unstable
 *
 * allowed values of `displayName` of `BaseElement` and `ElemebtsContext` keys
 */
export type ElementDisplayName =
  | 'Button'
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
  | DescriptionElementDisplayName
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
  React.ComponentProps<T>;

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
  React.Attributes &
  Pick<K, ElementPropKey<T>> & { testId?: string; variant?: V };

/**
 * @internal @unstable
 */
export type BaseElementWithRefProps<
  T extends keyof K,
  V = string,
  K extends Record<ElementPropKey<keyof K>, any> = Record<string, any>,
> = BaseElementProps<T, V, K> & React.RefAttributes<ElementRefType<K>>;

/**
 * @internal @unstable
 */
export type ElementWithAndWithoutRef<
  T extends ReactElementType,
  K extends React.ComponentType<React.ComponentProps<T>> = React.ComponentType<
    React.ComponentProps<T>
  >,
> = K extends React.ComponentType<infer U>
  ? React.ForwardRefExoticComponent<U>
  : never;

/**
 * @internal @unstable
 *
 * Merge `BaseElement` defintions with `elements` types provided by
 * consumers, for use with top level connected component function
 * signatures.
 *
 * Example:
 *
 * ```tsx
 *  export function createStorageBrowser<
 *    T extends Partial<StorageBrowserElements>,
 *  >({ elements }: CreateStorageBrowserInput<T> = {}): {
 *    StorageBrowser: StorageBrowser<MergeElements<StorageBrowserElements, T>>
 *  } {
 *    // ...do create stuff
 *  };
 * ```
 */
export type MergeBaseElements<T, K extends Partial<T>> = {
  [U in keyof T]: K[U] extends T[U] ? K[U] : T[U];
};

/**
 * @internal @unstable
 *
 * Extend the defintion of a `BaseElement` with additional `props`.
 *
 * Use cases are restricted to scenarios where additional `props`
 * are required for a `ControlElement` interface, for example:
 *
 * @example
 * ```tsx
 *  const FieldInput = defineBaseElementWithRef({
 *    type: 'input',
 *    displayName: 'Input'
 *  });
 *
 *  type InputWithSearchCallback =
 *    ExtendBaseElement<
 *      typeof FieldInput,
 *      { onSearch?: (event: { value: string }) => void }
 *    >
 *
 *  const SearchInput = React.forwardRef((
 *    { onSearch, ...props }
 *    ref
 *    ) => {
 *      // ...do something with onSearch
 *
 *      return <FieldInput {...props} ref={ref} />;
 *  });
 * ```
 *
 * Caveats:
 * - additional `props` should not be passed directly to
 * `BaseElement` components, the outputted interface should be
 * applied to a wrapping element that handles the additional `props`
 *
 * - additional `props` that share a key with existing `props`
 * are omitted from the outputted interface to adhere to `BaseElement`
 * type contracts
 *
 */
export type ExtendBaseElement<
  // `BaseElement` to extend
  T extends React.ComponentType,
  // additional `props`
  K = {},
  U extends React.ComponentPropsWithRef<T> = React.ComponentPropsWithRef<T>,
> = BaseElementWithRef<U & Omit<K, keyof U>, U>;
