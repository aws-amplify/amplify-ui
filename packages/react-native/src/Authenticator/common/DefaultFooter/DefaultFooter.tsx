import React from 'react';
import { View } from 'react-native';

import type { DefaultFooterProps } from './types';

export default function DefaultFooter({
  children,
  ...rest
}: DefaultFooterProps): React.JSX.Element | null {
  return children ? <View {...rest}>{children}</View> : null;
}
