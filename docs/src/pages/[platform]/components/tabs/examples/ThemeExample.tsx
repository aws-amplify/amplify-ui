import { ThemeProvider, Tabs, TabItem } from '@aws-amplify/ui-react';

const theme = {
  name: 'tabs-theme',
  tokens: {
    colors: {
      border: {
        secondary: { value: '#eccedd' },
      },
    },
    components: {
      tabs: {
        item: {
          _active: {
            color: { value: '#9551a0' },
            borderColor: { value: '#9551a0' },
          },
        },
      },
    },
  },
};

export const ThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <Tabs>
        <TabItem title="Tab 1">Tab 1 Content</TabItem>
        <TabItem title="Tab 2">Tab 2 Content</TabItem>
      </Tabs>
    </ThemeProvider>
  );
};
