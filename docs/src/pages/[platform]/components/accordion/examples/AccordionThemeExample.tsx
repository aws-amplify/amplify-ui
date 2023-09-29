import { Accordion, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
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
            paddingInline: '{space.xxl}',
            color: '{colors.blue.80}',
            paddingBlockEnd: '{space.large}',
          },
        },
      },
    },
  },
};

export const AccordionThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Accordion>
      <Accordion.Item title="Check out this themed Accordion" value="item1">
        Pretty cool!
      </Accordion.Item>
      <Accordion.Item title="It's very customizable" value="item2">
        I love it.
      </Accordion.Item>
    </Accordion>
  </ThemeProvider>
);
