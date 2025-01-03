import React from 'react';

import { Heading } from '../../../primitives/Heading';
import { DefaultHeaderProps } from './types';

export default function DefaultHeader({
  children,
  level = 3,
  ...rest
}: DefaultHeaderProps): JSX.Element | null {
  return children ? (
    <Heading {...rest} level={level}>
      {children}
    </Heading>
  ) : null;
}
