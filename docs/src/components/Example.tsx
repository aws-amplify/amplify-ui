import * as React from 'react';

import { Card, useTheme } from '@aws-amplify/ui-react';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className = '' }: ExampleProps) {
  const { tokens } = useTheme();
  return (
    <Card
      className={`example ${className}`}
      style={{ marginBottom: `${tokens.space.large}` }}
    >
      {children}
    </Card>
  );
}
