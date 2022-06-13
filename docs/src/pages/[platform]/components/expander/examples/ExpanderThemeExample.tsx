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
        backgroundColor: { value: '{colors.brand.primary.60.value}' },
        borderRadius: { value: '{radii.small.value}' },
        trigger: {
          minHeight: { value: '5rem' },
          justifyContent: { value: 'center' },
          _hover: {
            backgroundColor: { value: '{colors.overlay.20.value}' },
          },
        },
        content: {
          paddingInlineStart: { value: '{space.xxl.value}' },
          text: {
            color: { value: '{colors.white.value}' },
            paddingBlockEnd: { value: '{space.large.value}' },
          },
          _open: {
            animationDuration: { value: '{time.short.value}' },
          },
        },
      },
    },
  },
};

export const ExpanderThemeExample = () => (
  <ThemeProvider theme={theme}>
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
