import * as React from 'react';
import type { ColorMode } from '@aws-amplify/ui-react';
import { Theme } from '@aws-amplify/ui-react/server';
import { theme } from '@/theme';
import { Header } from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';
import { cookies } from 'next/headers';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const colorMode = cookieStore.get('colorMode');

  return (
    <Theme.Container theme={theme} colorMode={colorMode?.value as ColorMode}>
      <Header>
        Amplify UI RSC
        <ThemeToggle initialValue={colorMode?.value as ColorMode} />
      </Header>
      {children}
      <Theme.Style theme={theme} />
    </Theme.Container>
  );
}
