'use client';
import * as React from 'react';
import { Button, ColorMode } from '@aws-amplify/ui-react';
import { Theme } from '@aws-amplify/ui-react/theme';
import { theme } from '@/theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = React.useState<ColorMode>('light');
  console.log('client');
  return (
    <Theme.Container theme={theme} colorMode={colorMode}>
      <div
        className="p-10"
        style={{
          backgroundColor: `${theme.tokens.colors.background.primary}`,
        }}
      >
        <Button
          onClick={() => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }}
        >
          {colorMode}
        </Button>
        {children}
      </div>
      <div className="disco">
        <Button>Testing</Button>
      </div>
    </Theme.Container>
  );
}
