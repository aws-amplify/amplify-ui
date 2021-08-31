import * as React from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export type SelectSize = 'small' | 'large';

export type SelectVariation = 'quiet';

export interface SelectProps
  extends AriaProps,
    BaseComponentProps,
    BaseStyleProps {
  name?: string;

  defaultValue?: string;

  value?: string;

  size?: SelectSize;

  variation?: SelectVariation;

  icon?: React.ReactElement;

  iconColor?: string;

  placeholder?: string;

  hasError?: boolean;

  isDisabled?: boolean;

  isRequired?: boolean;

  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
