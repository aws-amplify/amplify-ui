import '@aws-amplify/ui-react/styles.css';
import { Theme } from '@aws-amplify/ui-react/theme';
import theme from '../theme';
import Body from '@/components/Body';
import '../styles/base.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Body>
        {children}
        <Theme.Style theme={theme} />
      </Body>
    </html>
  );
}
