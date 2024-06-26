import { Theme, createComponentClasses } from '@aws-amplify/ui-react/server';
import { theme } from '@/theme';

const headingClasses = createComponentClasses({ name: 'heading' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row">
      <div className="flex-1 p-2">
        <h2 className={headingClasses({ _modifiers: ['2'] })}>Custom theme</h2>

        <Theme.Style theme={theme} />
        <Theme.Container theme={theme}>{children}</Theme.Container>
      </div>
      <div className="flex-1 p-2">
        <h2 className={headingClasses({ _modifiers: ['2'] })}>Default theme</h2>
        {children}
      </div>
    </div>
  );
}
