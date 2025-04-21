import React from 'react';
import { ElementsContext } from './ElementsContext';
import type {
  BaseElement,
  BaseElementProps,
  BaseElementWithRef,
  BaseElementWithRefProps,
  ElementDisplayName,
  ElementRefType,
  ReactElementProps,
  ReactElementType,
} from './types';

/**
 * @internal @unstable
 */
export interface DefineBaseElementInput<T> {
  /**
   * `BaseElement` display name in React dev tools and stack traces
   */
  displayName: ElementDisplayName;

  /**
   * base HTML `element` type
   */
  type: T;
}

/**
 * @internal @unstable
 *
 * Defines a `ElementsContext` aware `BaseElement` UI component of the
 * provided `type` with an assigned `displayName`.
 *
 * If `BaseElement` is used as a child of an `ElementsProvider`, returns the
 * `BaseElement` value of the provided `displayName` of `ElementsContext`.
 *
 * When used outside of a  parent `ElementsProvider` or no `BaseElement`
 * of `displayName` is found in the `ElementsContext`, returns a stateless,
 * unstyled HTML element of the provided `type`.
 *
 * @param {DefineBaseElementInput} input `BaseElement` parameters
 * @returns {BaseElement} `ElementsContext` aware UI component
 */
export function defineBaseElement<
  // element type
  T extends ReactElementType,
  // string union of base element props to include
  K extends keyof U = never,
  // variant string union
  V = string,
  // available props of base element type
  U extends ReactElementProps<T> = ReactElementProps<T>,
  // control element props
  P extends BaseElementProps<K, V, U> = BaseElementProps<K, V, U>,
>(input: DefineBaseElementInput<T>): BaseElement<P> {
  const { displayName, type } = input;

  const Element = ({ variant, ...props }: Omit<P, 'ref'>) => {
    const Element = React.useContext(ElementsContext)?.[displayName];

    if (Element) {
      // only pass `variant` to provided `Element` values
      return <Element {...{ ...props, variant }} />;
    }

    return React.createElement(type, props);
  };

  Element.displayName = displayName;

  return Element;
}

/**
 * @internal @unstable
 *
 * Defines a `ElementsContext` aware `BaseElement` UI component of the
 * provided `type` with an assigned `displayName` and element `ref`.
 *
 * If `BaseElement` is used as a child of an `ElementsProvider`, returns the
 * `BaseElement` value of the provided `displayName` of `ElementsContext`.
 *
 * When used outside of a  parent `ElementsProvider` or no `BaseElement`
 * of `displayName` is found in the `ElementsContext`, returns a stateless,
 * unstyled HTML element of the provided `type`.
 *
 * @param {DefineBaseElementInput} input `BaseElement` parameters
 * @returns {BaseElementWithRefProps} `ElementsContext` aware UI component
 */
export function defineBaseElementWithRef<
  // element type
  T extends ReactElementType,
  // string union of base element props to include
  K extends keyof U = never,
  // variant string union
  V = string,
  // available props of base element type
  U extends ReactElementProps<T> = ReactElementProps<T>,
  // control element props
  P extends BaseElementWithRefProps<K, V, U> = BaseElementWithRefProps<K, V, U>,
>(input: DefineBaseElementInput<T>): BaseElementWithRef<P, ElementRefType<P>> {
  const { displayName, type } = input;

  const Element = React.forwardRef<ElementRefType<P>, P>(
    ({ variant, ...props }, ref) => {
      const Element = React.useContext(ElementsContext)?.[displayName];

      if (Element) {
        // only pass `variant` to provided `Element` values
        return <Element {...{ ...props, ref, variant }} />;
      }

      return React.createElement(type, { ...props, ref });
    }
  );

  Element.displayName = displayName;

  return Element;
}
