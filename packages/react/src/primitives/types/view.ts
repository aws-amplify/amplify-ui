import type * as React from 'react';
import type { MergeProps } from '@aws-amplify/ui-react-core';

import type { AriaProps, BaseComponentProps } from './base';
import type { BaseStyleProps } from './style';

/**
 * @deprecated will be removed in a future major version
 */
// A utility type to check if a type is any
export type IsAny<Type> = (Type extends never ? true : false) extends false
  ? false
  : true;

/**
 * @deprecated will be removed in a future major version
 */
export type ElementType = React.ElementType;

type AsProp<Element extends ElementType> = {
  /**
   * @description
   * Changes the type of HTML element rendered
   */
  as?: Element;
};

/**
 * @deprecated will be removed in a future major version
 */
export type PrimitivePropsWithAs<
  Props extends BaseViewProps,
  Element extends ElementType,
> = Omit<Props, 'as'> & AsProp<Element>;

type PrimitivePropsWithRef<
  Props extends BaseViewProps,
  Element extends ElementType,
> = Omit<Props, 'ref'> & React.RefAttributes<React.ComponentRef<Element>>;

/**
 * @deprecated will be removed in a future major version
 */
export type PrimitivePropsWithHTMLAttributes<
  Props extends BaseViewProps,
  Element extends ElementType,
> =
  /**
   * Doing an IsAny<Element> conditional check here makes sure typescript infers the type of `Element`.
   * Without this check Typescript won't do an additional inference phase for the generics `Element`,
   * and simply treat it as any, which in turn affects other the inference for other types.
   * e.g. In an event handler, onChange((event) => { console.log(event)}), event will be implicitly inferred as any without the check
   */
  IsAny<Element> extends false
    ? MergeProps<
        PrimitivePropsWithRef<Props, Element>,
        // exclude `ref?: LegacyRef` included in DetailedHTMLProps
        React.ComponentPropsWithoutRef<Element>
      >
    : any;

/**
 * @deprecated will be removed in a future major version
 */
export type PrimitiveProps<
  Props extends BaseViewProps,
  Element extends ElementType,
> = PrimitivePropsWithHTMLAttributes<
  PrimitivePropsWithAs<Props, Element>,
  Element
>;

/**
 * @deprecated will be removed in a future major version
 */
export interface Primitive<
  Props extends BaseViewProps,
  Element extends ElementType,
> extends React.ForwardRefRenderFunction<React.ComponentRef<Element>, Props> {}

/**
 * @deprecated will be removed in a future major version
 */
export interface ForwardRefPrimitive<
  Props extends BaseViewProps,
  DefaultElement extends ElementType,
> extends React.ForwardRefExoticComponent<
    PrimitiveProps<Props, DefaultElement>
  > {
  // overload the JSX constructor to make it accept generics
  <Element extends ElementType = DefaultElement>(
    props: PrimitiveProps<Props, Element>
  ): ReturnType<
    React.ForwardRefExoticComponent<PrimitiveProps<Props, DefaultElement>>
  >;
}

/** @deprecated For internal use only */
export interface BaseViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * @description
   * Sets the Boolean `disabled` HTML attribute, which, when present, makes the element not mutable, focusable, or even submitted with the form
   */
  isDisabled?: boolean;

  /**
   * @description
   * Accepts a JavaScript object with camelCased properties rather than a CSS string.
   * This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.
   * @see
   *[React docs](https://reactjs.org/docs/dom-elements.html#style)
   */
  style?: React.CSSProperties;
}

export type ViewProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseViewProps,
  Element
>;
