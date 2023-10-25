import {
  createTheme,
  createComponentTheme,
  Theme,
} from '@aws-amplify/ui-react/theme';
import { Button } from '@aws-amplify/ui-react';

const theme = createTheme({
  name: 'my-theme',
  components: {
    button(tokens) {
      return {
        borderRadius: tokens.radii.xxl,
        modifier: {
          primary: {
            textShadow: `0 -1px 0 ${tokens.colors.overlay[40]}`,
            backgroundImage: `linear-gradient(${tokens.colors.brand.primary[40]}, transparent)`,
            boxShadow: tokens.shadows.large,
            borderColor: tokens.colors.brand.primary[80],
          },
        },
      };
    },
  },
});

export default function DefaultComponentTheming() {
  return (
    <Theme theme={theme}>
      <Button variation="primary">Button</Button>
    </Theme>
  );
}
