import { createComponentTheme } from '@aws-amplify/ui-react/theme';

export default createComponentTheme({
  name: 'button',
  theme(tokens) {
    return {
      backgroundImage: `linear-gradient(${tokens.colors.brand.primary[20]}, transparent)`,
    };
  },
});
