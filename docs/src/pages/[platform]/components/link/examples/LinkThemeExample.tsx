import { Link, Theme, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'link-theme',
  tokens: {
    components: {
      link: {
        focus: {
          color: { value: '{colors.blue.40}' },
        },
        hover: {
          color: { value: '{colors.blue.60}' },
        },
        visited: {
          color: { value: '{colors.blue.80}' },
        },
      },
    },
  },
};

export const LinkThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Link href="https://ui.docs.amplify.aws/react/components/link" isExternal>
        Themed Link
      </Link>
    </ThemeProvider>
  );
};
