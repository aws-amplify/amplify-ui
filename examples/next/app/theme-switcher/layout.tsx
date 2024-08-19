import * as React from 'react';
import type { ColorMode } from '@aws-amplify/ui-react';
import { ThemeStyle } from '@aws-amplify/ui-react/server';
import { theme } from '@/theme';
import { Header } from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';
import { cookies } from 'next/headers';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const colorMode = (cookieStore.get('colorMode')?.value ??
    'dark') as ColorMode;

  return (
    <div {...theme.containerProps({ colorMode })}>
      {/* Header */}
      <Header>
        Amplify UI RSC
        <ThemeToggle initialValue={colorMode} />
      </Header>
      {children}
      <ThemeStyle theme={theme} />
    </div>
  );
}
