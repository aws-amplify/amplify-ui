import React from 'react';

import { Flex } from '../../../primitives/Flex';

import { BackdropProps } from './types';

export default function Backdrop({
  children,
  ...rest
}: BackdropProps): JSX.Element {
  return (
    <Flex className="amplify-backdrop" {...rest}>
      {children}
    </Flex>
  );
}
