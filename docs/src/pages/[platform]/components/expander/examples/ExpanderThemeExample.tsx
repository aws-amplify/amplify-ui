import {
  Expander,
  ExpanderItem,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'Expander-theme',
  tokens: {
    components: {
      expander: {
        // TODO: customize here
      },
    },
  },
};

export const ExpanderThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Expander>
      <ExpanderItem title="What is an ExpanderItem?" value="expander-item">
        An ExpanderItem contains all the parts of a collapsible section.
      </ExpanderItem>
      <ExpanderItem title="This is the item's title" value="unique-value">
        The `children` of the ExpanderItem are displayed here.
      </ExpanderItem>
    </Expander>
  </ThemeProvider>
);
