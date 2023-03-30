import React from 'react';

import { View } from '@aws-amplify/ui-react';

interface ContainerProps {
  children: React.ReactNode;
  className: string;
}

export function Container({
  children,
  className,
}: ContainerProps): JSX.Element {
  return <View className={className}>{children}</View>;
}
