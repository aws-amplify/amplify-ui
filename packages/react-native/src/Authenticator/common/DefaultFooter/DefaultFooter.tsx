import React from 'react';
import { View } from 'react-native';

import { DefaultFooterProps } from './types';

export default function DefaultFooter({
  children,
  ...rest
}: DefaultFooterProps): JSX.Element | null {
  return children ? <View {...rest}>{children}</View> : null;
}
