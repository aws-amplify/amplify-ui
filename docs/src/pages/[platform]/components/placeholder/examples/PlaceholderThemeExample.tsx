import { Theme, Placeholder, AmplifyProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'placeholder-theme',
  tokens: {
    components: {
      placeholder: {
        startColor: { value: 'rebeccapurple' },
        endColor: { value: 'cyan' },
      },
    },
  },
};

export const PlaceholderThemeExample = () => {
  return (
    <AmplifyProvider theme={theme}>
      <Placeholder />
    </AmplifyProvider>
  );
};
