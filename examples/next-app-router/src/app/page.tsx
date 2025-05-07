import { Avatar } from '@/components/Avatar';
import { theme } from '@/theme';
import Link from 'next/link';

// hardcode test link payload to avoid inclusion of `use client` directive
const LINK_PAYLOAD =
  '?value=%7B%22location%22%3A%7B%22id%22%3A%220548bb23-a365-4597-9599-5f3a93b6aebe%22%2C%22type%22%3A%22PREFIX%22%2C%22permissions%22%3A%5B%22delete%22%2C%22get%22%2C%22list%22%2C%22write%22%5D%2C%22bucket%22%3A%22my-bucket%22%2C%22prefix%22%3A%22my-prefix%2F%22%2C%22path%22%3A%22my-nested-prefix%2F%22%7D%7D';

export default function Home() {
  return (
    <main>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/theme">Theme</Link>
        <Link href="/theme-switcher">Theme Switcher</Link>
      </div>

      <Avatar />

      <div {...theme.containerProps({ colorMode: 'dark' })}>
        <h2>I&#39;m dark</h2>
        <Avatar />

        <h2>StorageBrowser Test Apps</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link href={`/storage-browser/controlled-value${LINK_PAYLOAD}`}>
            Controlled Value
          </Link>
          <Link href={`/storage-browser/default-value${LINK_PAYLOAD}`}>
            Default Value
          </Link>
        </div>
      </div>
    </main>
  );
}
