import { Tabs, TabItem, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'tabs-theme',
  tokens: {
    components: {
      tabs: {
        borderColor: { value: '{colors.neutral.20}' },
        item: {
          color: { value: '{colors.blue.80}' },
          fontSize: { value: '{fontSizes.xl}' },
          fontWeight: { value: '{fontWeights.normal}' },

          _hover: {
            color: { value: '{colors.blue.60}' },
          },
          _focus: {
            color: { value: '{colors.blue.60}' },
          },
          _active: {
            color: { value: '{colors.blue.80}' },
            borderColor: { value: '{colors.blue.80}' },
            backgroundColor: { value: '{colors.blue.10}' },
          },
          _disabled: {
            color: { value: 'gray' },
            backgroundColor: { value: 'transparent' },
          },
        },
      },
    },
  },
};

export const TabsThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Tabs>
        <TabItem title="Tab 1">Tab 1 Content</TabItem>
        <TabItem title="Tab 2">Tab 2 Content</TabItem>
        <TabItem title="Tab 3" isDisabled>
          Tab 3 Content
        </TabItem>
      </Tabs>
    </ThemeProvider>
  );
};
