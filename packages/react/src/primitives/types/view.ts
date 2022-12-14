import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import { Root as SliderRoot } from '@radix-ui/react-slider';
import {
  Root as ExpanderRoot,
  Item as ExpanderItem,
} from '@radix-ui/react-accordion';
import { Trigger as Tab } from '@radix-ui/react-tabs';

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
  Props extends ViewProps,
  Element extends ElementType
> = Omit<Props, 'as'> & AsProp<Element>;

export type PrimitivePropsWithoutRef<
  Props extends ViewProps,
  Element extends ElementType
> = Element extends
  | keyof JSX.IntrinsicElements
  | typeof ExpanderItem
  | typeof ExpanderRoot
  | typeof SliderRoot
  | typeof Tab
  ? MergeProps<
      PrimitivePropsWithAs<Props, Element>,
      // exclude `ref?: LegacyRef` included in DetailedHTMLProps
      React.ComponentPropsWithoutRef<Element>
    >
  : // If an element is not Radix element or keyof JSX.IntrinsicElements
    // No need to merge, just add the `as` prop
    PrimitivePropsWithAs<React.ComponentPropsWithoutRef<Element>, Element>;

export type PrimitivePropsWithRef<
  Props extends ViewProps,
  Element extends ElementType
> = PrimitivePropsWithoutRef<Props, Element> & RefProp<Element>;

export type Primitive<
  Props extends ViewProps,
  Element extends ElementType
> = React.ForwardRefRenderFunction<
  React.ComponentRef<Element>,
  PrimitivePropsWithRef<Props, Element>
>;

export interface ForwardRefPrimitive<
  Props extends ViewProps,
  DefaultElement extends ElementType
> extends ReturnType<typeof React.forwardRef> {
  <Element extends ElementType = DefaultElement>(
    props: PrimitivePropsWithRef<Props, Element>
  ): React.ReactElement;
}

export interface ViewProps
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
