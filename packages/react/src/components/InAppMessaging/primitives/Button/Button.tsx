import React from 'react';

import { styles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  children,
  textStyle,
  ...pressableProps
}: ButtonProps): JSX.Element {
  return <div>{children}</div>;
}
