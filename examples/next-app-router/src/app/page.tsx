import { Avatar } from '@/components/Avatar';
import { theme } from '@/theme';
import { Theme } from '@aws-amplify/ui-react/server';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/theme">Theme</Link>
      <Link href="/theme-switcher">Theme Switcher</Link>
      <Avatar />

      <Theme.Container theme={theme} colorMode="dark">
        <h2>I'm dark</h2>
        <Avatar />
      </Theme.Container>
    </main>
  );
}
