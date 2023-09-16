'use client';
import { Button } from '@aws-amplify/ui-react';
import * as React from 'react';
export default function Body({ children }: React.PropsWithChildren) {
  const [colorMode, setColorMode] = React.useState('light');
  const handleClick = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <body data-color-mode={colorMode}>
      <Button onClick={handleClick}>Toggle</Button>
      {children}
    </body>
  );
}
