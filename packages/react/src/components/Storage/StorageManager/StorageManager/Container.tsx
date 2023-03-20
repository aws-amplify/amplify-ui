import React from 'react';
import { View } from '../../../../primitives';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  // @TODO: rename all fileuploader classnames to storageManager
  return <View>{children}</View>;
}
