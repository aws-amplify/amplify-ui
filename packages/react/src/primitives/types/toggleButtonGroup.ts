import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import { FlexStyleProps } from './flex';
import { ToggleButtonProps } from './toggleButton';

export interface ToggleButtonGroupProps
  extends BaseComponentProps,
    BaseStyleProps,
    FlexStyleProps,
    Pick<AriaProps, 'ariaLabel'>,
    Pick<ToggleButtonProps, 'size' | 'variation'> {
  children: React.ReactNode;
  isExclusive?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}
