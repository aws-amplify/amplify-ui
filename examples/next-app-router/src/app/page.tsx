import { Avatar } from '@/components/Avatar';
import { theme } from '@/theme';
import { ThemeStyle } from '@aws-amplify/ui-react/server';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/theme">Theme</Link>
      <Link href="/theme-switcher">Theme Switcher</Link>
      <Avatar />

      <div {...theme.containerProps({ colorMode: 'dark' })}>
        <h2>I'm dark</h2>
        <Avatar />
      </div>
    </main>
  );
}
