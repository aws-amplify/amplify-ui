import React, { FormEvent } from 'react';

import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export type SelectSize = 'small' | 'large';

export type SelectVariation = 'outline' | 'unstyled' | 'filled' | 'flushed';

export interface SelectProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  size?: SelectSize;

  variation?: SelectVariation;

  icon?: React.ReactElement;

  placeholder?: string;

  isDisabled?: boolean;

  isRequired?: boolean;

  onChange?: (e: FormEvent<HTMLSelectElement>) => void;
}
