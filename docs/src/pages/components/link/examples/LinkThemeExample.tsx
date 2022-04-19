import { Link, Theme, AmplifyProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'link-theme',
  tokens: {
    components: {
      link: {
        // this will affect the color of all links
        color: { value: '{colors.red.80.value}' },
      },
    },
  },
};
export const LinkThemeExample = () => {
  return (
    <AmplifyProvider theme={theme}>
      <Link>My custom Link</Link>
    </AmplifyProvider>
  );
};
