import { Accordion, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'Accordion-theme',
  tokens: {
    components: {
      accordion: {
        backgroundColor: { value: '{colors.blue.10}' },
        borderRadius: { value: '{radii.small}' },
        header: {
          _hover: {
            backgroundColor: { value: '{colors.overlay.20}' },
          },
        },
        body: {
          paddingInlineStart: { value: '{space.xxl}' },
          color: { value: '{colors.blue.80}' },
          paddingBlockEnd: { value: '{space.large}' },
          _open: {
            animationDuration: { value: '{time.short}' },
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
