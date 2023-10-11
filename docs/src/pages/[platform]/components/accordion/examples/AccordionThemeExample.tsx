import { Accordion, ThemeProvider, createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
  name: 'Accordion-theme',
  tokens: {
    components: {
      accordion: {
        backgroundColor: '{colors.blue.10}',
        item: {
          trigger: {
            color: '{colors.blue.80}',
            _hover: {
              color: '{colors.blue.90}',
              backgroundColor: '{colors.blue.20}',
            },
          },
          content: {
            color: '{colors.blue.80}',
          },
        },
      },
    },
  },
});

export const AccordionThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Accordion>
      <Accordion.Item value="item1">
        <Accordion.Trigger>
          Check out this themed Accordion
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>Pretty cool!</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item2">
        <Accordion.Trigger>
          It is very customizable
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>I love it.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  </ThemeProvider>
);
