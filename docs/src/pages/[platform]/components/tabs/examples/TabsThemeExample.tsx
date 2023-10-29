import { Tabs, ThemeProvider, createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
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
});

export const TabsThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Tabs.Container defaultValue="1">
        <Tabs.List>
          <Tabs.Item value="1">Tab 1</Tabs.Item>
          <Tabs.Item value="2">Tab 2</Tabs.Item>
          <Tabs.Item value="3" isDisabled>
            Tab 3
          </Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">Tab 1 Content</Tabs.Panel>
        <Tabs.Panel value="2">Tab 2 Content</Tabs.Panel>
        <Tabs.Panel value="3" isDisabled>
          Tab 3 Content
        </Tabs.Panel>
      </Tabs.Container>
    </ThemeProvider>
  );
};
