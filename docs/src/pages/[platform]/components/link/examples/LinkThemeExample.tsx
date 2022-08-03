import { Link, Theme, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'link-theme',
  tokens: {
    components: {
      link: {
        _focus: {
          color: { value: '{colors.blue.40}' },
        },
        _hover: {
          color: { value: '{colors.blue.60}' },
        },
        _visited: {
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
