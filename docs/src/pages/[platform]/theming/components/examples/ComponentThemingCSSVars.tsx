import { Alert } from '@aws-amplify/ui-react';
import { createTheme, Theme } from '@aws-amplify/ui-react/theme';

const theme = createTheme({
  name: 'alert-theme',
  components: {
    alert(tokens) {
      const varName = 'iconColor';
      return {
        // define a component-specific variables here
        vars: {
          [varName]: tokens.colors.neutral[60],
        },
        border: `${tokens.borderWidths.small} solid ${tokens.colors.border.secondary}`,
        modifier: {
          info: {
            // override the variable here for a specific modifier/variation of the component
            vars: {
              [varName]: tokens.colors.blue[40],
            },
            borderColor: tokens.colors.blue[40],
          },
          success: {
            vars: {
              [varName]: tokens.colors.green[40],
            },
            borderColor: tokens.colors.green[40],
          },
        },
        element: {
          icon: {
            // Use the variable in a CSS property. Here the icon will be different colors
            // based on the modifier/variation of the component.
            color: `var(--${varName})`,
          },
        },
      };
    },
  },
});

export default function ComponentThemingCSSVars() {
  return (
    <Theme theme={theme}>
      <Alert variation="info">Info alert</Alert>
      <Alert variation="success">Success alert</Alert>
    </Theme>
  );
}
