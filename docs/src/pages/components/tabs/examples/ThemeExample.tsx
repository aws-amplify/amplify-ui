import { AmplifyProvider, Tabs, TabItem } from '@aws-amplify/ui-react';

const theme = {
  name: 'app-theme',
  tokens: {
    colors: {
      border: {
        secondary: { value: '#e4f0eb' },
      },
    },
    components: {
      tabs: {
        borderWidth: { value: '4px' },
        item: {
          _active: {
            color: { value: '#0b4956' },
            borderColor: { value: '#e4f0eb' },
            backgroundColor: { value: '#e4f0eb' },
          },
        },
      },
    },
  },
};

export const ThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <Tabs>
      <TabItem title="Tab 1">Tab 1 Content</TabItem>
      <TabItem title="Tab 2">Tab 2 Content</TabItem>
    </Tabs>
  </AmplifyProvider>
);
