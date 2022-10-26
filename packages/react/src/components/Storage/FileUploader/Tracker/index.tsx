import React from 'react';
import { View } from '../../../../primitives';

export function Tracker({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <View>
      <View>{children}</View>
    </View>
  );
}
