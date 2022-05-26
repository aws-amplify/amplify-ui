import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

type MergeProps<A, B> = A & Omit<B, keyof A>;

export type ElementType = React.FC<any> | keyof JSX.IntrinsicElements;

/**
 * Convert string element type to DOMElement Type
 * e.g. 'button' => HTMLButtonElement
 */
export type HTMLElementType<Element extends ElementType> =
  Element extends keyof JSX.IntrinsicElements
    ? React.ElementRef<Element>
    : HTMLElementTypeFromExoticComponentRef<Element>;

/**
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
    as?: Element | Props['as'];
  },
  Omit<ElementProps<Element>, 'ref'> // exclude `ref?: LegacyRef` included in DetailedHTMLProps
>;

export type PrimitivePropsWithRef<
  Props extends ViewProps,
  Element extends ElementType
> = PrimitiveProps<Props, Element> & {
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
  as?: ElementType;

  isDisabled?: boolean;

  style?: React.CSSProperties;
}
