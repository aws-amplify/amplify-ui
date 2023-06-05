import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

// A utility type to check if a type is any
export type IsAny<Type> = (Type extends never ? true : false) extends false
  ? false
  : true;

type MergeProps<A, B> = A & Omit<B, keyof A>;

export type ElementType = React.ElementType;

type AsProp<Element extends ElementType> = {
  /**
   * @description
   * Changes the type of HTML element rendered
   */
  as?: Element;
};

export type PrimitivePropsWithAs<
  Props extends BaseViewProps,
  Element extends ElementType
> = Omit<Props, 'as'> & AsProp<Element>;

type PrimitivePropsWithRef<
  Props extends BaseViewProps,
  Element extends ElementType
> = Omit<Props, 'ref'> &
  (IsAny<Element> extends false
    ? React.RefAttributes<React.ComponentRef<Element>>
    : React.RefAttributes<any>);

export type PrimitivePropsWithHTMLAttributes<
  Props extends BaseViewProps,
  Element extends ElementType
> = MergeProps<
  PrimitivePropsWithRef<Props, Element>,
  // exclude `ref?: LegacyRef` included in DetailedHTMLProps
  React.ComponentPropsWithoutRef<Element>
>;

export type PrimitiveProps<
  Props extends BaseViewProps,
  Element extends ElementType
> = PrimitivePropsWithHTMLAttributes<
  PrimitivePropsWithAs<Props, Element>,
  Element
>;

export type Primitive<
  Props extends BaseViewProps,
  Element extends ElementType
> = React.ForwardRefRenderFunction<React.ComponentRef<Element>, Props>;

export interface ForwardRefPrimitive<
  Props extends BaseViewProps,
  DefaultElement extends ElementType
> extends React.ForwardRefExoticComponent<Props> {
  // overload the JSX constructor to make it accept generics
  <Element extends ElementType = DefaultElement>(
    props: PrimitiveProps<Props, Element>
  ): React.ReactElement | null;
}

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
