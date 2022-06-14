import { Link, Theme, ThemeProvider } from '@aws-amplify/ui-react';

/*

color and visited-color point to the same value

--amplify-components-link-active-color: var(--amplify-colors-font-active);
--amplify-components-link-color: var(--amplify-colors-font-interactive);
--amplify-components-link-focus-color: var(--amplify-colors-font-focus);
--amplify-components-link-hover-color: var(--amplify-colors-font-hover);
--amplify-components-link-visited-color: var(--amplify-colors-font-interactive);


I can only see the active state color if I toggle it in DevTools

*/

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
    <ThemeProvider theme={theme}>
      <Link href="https://ui.docs.amplify.aws/react/components/link" isExternal>
        Themed Link
      </Link>
    </ThemeProvider>
  );
};
