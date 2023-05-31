import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

type MergeProps<A, B> = A & Omit<B, keyof A>;

export type ElementType = React.ElementType;

type AsProp<Element extends ElementType> = {
  /**
   * @description
   * Changes the type of HTML element rendered
   */
  as?: Element;
};

type RefProp<Element extends ElementType> = React.RefAttributes<
  React.ComponentRef<Element>
>;

export type PrimitivePropsWithAs<
  Props extends BaseViewProps,
  Element extends ElementType
> = Omit<Props, 'as'> & AsProp<Element>;

export type PrimitivePropsWithoutRef<
  Props extends BaseViewProps,
  Element extends ElementType
> = MergeProps<
  PrimitivePropsWithAs<Props, Element>,
  // exclude `ref?: LegacyRef` included in DetailedHTMLProps
  React.ComponentPropsWithoutRef<Element>
>;

export type PrimitiveProps<
  Props extends BaseViewProps,
  Element extends ElementType
> = PrimitivePropsWithoutRef<Props, Element> & RefProp<Element>;

export type Primitive<
  Props extends BaseViewProps,
  Element extends ElementType
> = React.ForwardRefRenderFunction<
  React.ComponentRef<Element>,
  PrimitiveProps<Props, Element>
>;

export interface ForwardRefPrimitive<
  Props extends BaseViewProps,
  DefaultElement extends ElementType
> extends React.ForwardRefExoticComponent<unknown> {
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
