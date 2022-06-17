import { Link, Theme, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'link-theme',
  tokens: {
    components: {
      link: {
        // color and active don't seem to get applied
        color: { value: '{colors.yellow.60}' },
        active: {
          color: { value: '{colors.yellow.60}' },
        },
        focus: {
          color: { value: '{colors.red.60}' },
        },
        hover: {
          color: { value: '{colors.green.60}' },
        },
        visited: {
          color: { value: '{colors.purple.60}' },
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
