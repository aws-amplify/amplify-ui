import * as React from 'react';

import { AriaProps } from './base';
import { BaseStyleProps } from './style';
import { BaseButtonProps } from './button';
import { BaseFlexProps } from './flex';
import { ElementType, PrimitiveProps } from './view';

export interface BaseButtonGroupProps
  extends AriaProps,
    BaseStyleProps,
    BaseFlexProps,
    Pick<BaseButtonProps, 'size' | 'variation'> {
  children: React.ReactNode;
}

export type ButtonGroupProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseButtonGroupProps, Element>;
