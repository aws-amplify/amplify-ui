import React from 'react';

import { View } from '@aws-amplify/ui-react';

import type { BackdropProps } from './types';

export const BACKDROP_TEST_ID = 'inappmessaging-backdrop';

export function Backdrop({
  onClick,
  ...rest
}: BackdropProps): React.JSX.Element {
  return (
    <View
      className="amplify-inappmessaging-backdrop"
      data-testid={BACKDROP_TEST_ID}
      onClick={onClick}
      {...rest}
    />
  );
}
