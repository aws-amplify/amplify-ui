import {
  Expander,
  ExpanderItem,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'expander-theme',
  tokens: {
    components: {
      expander: {
        backgroundColor: { value: '{colors.blue.10}' },
        borderRadius: { value: '{radii.small}' },
        trigger: {
          minHeight: { value: '5rem' },
          justifyContent: { value: 'center' },
          _hover: {
            backgroundColor: { value: '{colors.overlay.20}' },
          },
        },
        content: {
          paddingInlineStart: { value: '{space.xxl}' },
          text: {
            color: { value: '{colors.blue.80}' },
            paddingBlockEnd: { value: '{space.large}' },
          },
          _open: {
            animationDuration: { value: '{time.short}' },
          },
        },
      },
    },
  },
};

export const ExpanderThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Expander>
      <ExpanderItem title="Check out this themed Expander" value="item1">
        Pretty cool!
      </ExpanderItem>
      <ExpanderItem title="It's very customizable" value="item2">
        I love it.
      </ExpanderItem>
    </Expander>
  </ThemeProvider>
);
