import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export type SelectSize = 'small' | 'large';

export type SelectVariation = 'filled' | 'flushed';

export interface SelectProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  name?: string;

  defaultValue?: string;

  value?: string;

  size?: SelectSize;

  variation?: SelectVariation;

  icon?: React.ReactElement;

  iconColor?: string;

  placeholder?: string;

  isDisabled?: boolean;

  isRequired?: boolean;

  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
