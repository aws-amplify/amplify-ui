import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

type MergeProps<A, B> = A & Omit<B, keyof A>;

export type ElementType = React.FC<any> | keyof JSX.IntrinsicElements;

/**
 * @description
 * Convert string element type to DOMElement Type
 * e.g. 'button' => HTMLButtonElement
 */
export type HTMLElementType<Element extends ElementType> =
  Element extends keyof JSX.IntrinsicElements
    ? React.ElementRef<Element>
    : HTMLElementTypeFromExoticComponentRef<Element>;

/**
 * @description
 * Allows us to extract ElementType from `typeof Root` used in SliderField
 * e.g. React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>> => HTMLSpanElement
 */
type HTMLElementTypeFromExoticComponentRef<Element extends ElementType> =
  Element extends React.ForwardRefExoticComponent<
    React.RefAttributes<infer DOMHTMLElement>
  >
    ? DOMHTMLElement
    : HTMLElement; // Fallback to HTMLElement if nothing else matches

export type ElementProps<Element extends ElementType> =
  Element extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[Element]
    : Element extends React.FC<infer ComponentProps>
    ? ComponentProps
    : never;

export type PrimitiveProps<
  Props extends ViewProps,
  Element extends ElementType
> = MergeProps<
  Omit<Props, 'as'> & {
    /**
     * @description
     * Changes the type of HTML element rendered
     */
    as?: Element | Props['as'];
  },
  Omit<ElementProps<Element>, 'ref'> // exclude `ref?: LegacyRef` included in DetailedHTMLProps
>;

export type PrimitivePropsWithRef<
  Props extends ViewProps,
  Element extends ElementType
> = PrimitiveProps<Props, Element> & {
  /**
   * @description
   * References a DOM element from within a parent component
   */
  ref?: React.Ref<HTMLElementType<Element>>;
};

export type Primitive<
  Props extends ViewProps,
  Element extends ElementType
> = React.ForwardRefRenderFunction<
  HTMLElementType<Element>,
  PrimitivePropsWithRef<Props, Element>
>;

export interface ViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * @description
   * Changes the type of HTML element rendered
   */
  as?: ElementType;

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
