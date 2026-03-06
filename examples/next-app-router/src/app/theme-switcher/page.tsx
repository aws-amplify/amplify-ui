import { ThemeStyle } from '@aws-amplify/ui-react/server';
import { Avatar } from '@/components/Avatar';
import { theme } from '@/theme';

export default function ThemeSwitcherPage() {
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
      <div {...theme.containerProps({ colorMode: 'dark' })}>
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
      </div>
      <ThemeStyle theme={theme} />
    </div>
  );
}
