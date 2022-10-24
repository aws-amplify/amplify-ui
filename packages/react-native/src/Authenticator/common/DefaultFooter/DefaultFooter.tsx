import React from 'react';
import { View } from 'react-native';

import { DefaultFooterProps } from './types';

export default function DefaultFooter({
  children,
}: DefaultFooterProps): JSX.Element | null {
  return children ? <View>{children}</View> : null;
}
