import '@aws-amplify/ui-react/styles.css';
import { Theme } from '@aws-amplify/ui-react/theme';
import theme from '../theme';
import Body from '@/components/Body';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}
