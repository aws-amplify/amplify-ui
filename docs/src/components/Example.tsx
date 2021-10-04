import * as React from 'react';

import { View } from '@aws-amplify/ui-react';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className }: ExampleProps) {
  return (
    <View
      backgroundColor="rgba(249, 250, 251, 1)"
      borderRadius="0.25rem"
      boxShadow="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
      className={className}
      style={{ marginBottom: '1.5rem' }}
      padding="1.5rem"
    >
      {children}
    </View>
  );
}
