import React from 'react';

import { Heading } from '../../../primitives/Heading';
import { DefaultHeaderProps } from './types';

export default function DefaultHeader({
  children,
}: DefaultHeaderProps): JSX.Element {
  return <Heading level={3}>{children}</Heading>;
}
