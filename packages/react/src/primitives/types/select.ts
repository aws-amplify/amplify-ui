import * as React from 'react';

import { ViewProps } from './view';
import { Sizes } from './base';

export type SelectVariation = 'quiet';

export interface SelectProps extends ViewProps {
  autoComplete?: string;

  name?: string;

  defaultValue?: string;

  value?: string;

  size?: Sizes;

  variation?: SelectVariation;

  icon?: React.ReactElement;

  iconColor?: string;

  placeholder?: string;

  hasError?: boolean;

  isDisabled?: boolean;

  isRequired?: boolean;

  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
