import React from 'react';

import { Flex } from '../../../primitives/Flex';

import { BackdropProps } from './types';

export function Backdrop({ children, ...rest }: BackdropProps): JSX.Element {
  return (
    <Flex className="amplify-inappmessaging-backdrop" {...rest}>
      {children}
    </Flex>
  );
}
