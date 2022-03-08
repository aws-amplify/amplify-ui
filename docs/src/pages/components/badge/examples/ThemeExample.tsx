import { Badge, AmplifyProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'badge-theme',
  tokens: {
    components: {
      badge: {
        borderRadius: { value: '0' },
      },
    },
  },
};

export const ThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <Badge>Default</Badge>
    <Badge variation="info">Info</Badge>
  </AmplifyProvider>
);
