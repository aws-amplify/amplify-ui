import { Link, Theme, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'link-theme',
  tokens: {
    components: {
      link: {
        // unable to see color
        color: { value: 'black' },
        // unable to see active
        active: {
          color: { value: '{colors.yellow.60.value}' },
        },
        focus: {
          color: { value: '{colors.red.60.value}' },
        },
        hover: {
          color: { value: '{colors.green.60.value}' },
        },
        visited: {
          color: { value: '{colors.purple.80.value}' },
        },
      },
    },
  },
};

export const LinkThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <Link href="https://ui.docs.amplify.aws/react/components/link" isExternal>
        Themed Link
      </Link>
    </ThemeProvider>
  );
};
