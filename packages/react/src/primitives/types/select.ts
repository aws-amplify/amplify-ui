import * as React from 'react';

import { ViewProps } from './view';

export type SelectSize = 'small' | 'large';

export type SelectVariation = 'quiet';

export interface SelectProps extends ViewProps {
  autoComplete?: string;

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
