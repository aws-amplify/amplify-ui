import { Avatar } from '@/components/Avatar';
import { theme } from '@/theme';
import { Theme } from '@aws-amplify/ui-react/theme';

export default function ThemeSwitcherPage() {
  console.log('server!');
  return (
    <div
      className="flex w-full flex-row"
      style={{
        backgroundColor: `var(--breakpoint-large, #f90)`,
      }}
    >
      <Avatar size="small" />
      <Avatar />
      <Avatar size="large" />
      <Theme.Container theme={theme} colorMode="dark">
        <div
          className="flex w-full flex-row"
          style={{
            backgroundColor: `${theme.tokens.colors.background.primary}`,
          }}
        >
          <Avatar size="small" />
          <Avatar />
          <Avatar size="large" />
        </div>
      </Theme.Container>
      <Theme.Style theme={theme} />
    </div>
  );
}
