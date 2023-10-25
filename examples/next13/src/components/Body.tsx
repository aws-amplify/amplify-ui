'use client';
import { Button } from '@aws-amplify/ui-react';
import * as React from 'react';
import theme from '@/theme';

export default function Body({ children }: React.PropsWithChildren<{}>) {
  const [colorMode, setColorMode] = React.useState('light');
  const handleClick = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <body data-amplify-color-mode={colorMode} data-amplify-theme={theme.name}>
      <Button onClick={handleClick}>Toggle</Button>
      {children}
    </body>
  );
}
