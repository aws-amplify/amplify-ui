import { createComponentTheme } from '@aws-amplify/ui-react/server';

// this is javascript, not typescript
export const buttonTheme = createComponentTheme({
  name: 'button',
  theme: (tokens) => {
    return {
      padding: tokens.space.large,
      margin: tokens.space.small,
      alignContent: 'baseline',
      _modifiers: {
        // no intellisense here b/c no discrimated union
        primary: {},
      },
    };
  },
});
