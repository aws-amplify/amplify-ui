import React from 'react';
import { Children } from 'react';
import { View } from '../../../../primitives';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <View className="amplify-fileuploader">{children}</View>;
}
