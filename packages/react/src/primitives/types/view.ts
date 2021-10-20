import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

type MergeProps<A, B> = A & Omit<B, keyof A>;

export type ElementType = React.FC<any> | keyof JSX.IntrinsicElements;

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
  Omit<Props, 'as'> & { as?: Element | Props['as'] },
  ElementProps<Element>
>;

export type Primitive<
  Props extends ViewProps,
  Element extends ElementType
> = React.FC<PrimitiveProps<Props, Element>>;

export interface ViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  as?: ElementType;

  isDisabled?: boolean;

  style?: React.CSSProperties;
}
