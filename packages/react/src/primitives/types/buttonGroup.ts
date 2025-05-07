import type * as React from 'react';

import type { AriaProps } from './base';
import type { BaseStyleProps } from './style';
import type { BaseButtonProps } from './button';
import type { BaseFlexProps } from './flex';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseButtonGroupProps
  extends AriaProps,
    BaseStyleProps,
    BaseFlexProps,
    Pick<BaseButtonProps, 'size' | 'variation'> {
  children?: React.ReactNode;
}

export type ButtonGroupProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseButtonGroupProps, Element>;
