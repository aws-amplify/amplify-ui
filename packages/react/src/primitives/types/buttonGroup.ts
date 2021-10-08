import * as React from 'react';

import { AriaProps } from './base';
import { BaseStyleProps } from './style';
import { ButtonProps } from './button';
import { FlexProps } from './flex';

export interface ButtonGroupProps
  extends AriaProps,
    BaseStyleProps,
    FlexProps,
    Pick<ButtonProps, 'size' | 'variation'> {
  children: React.ReactNode;
}
