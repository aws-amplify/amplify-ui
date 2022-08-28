import { Tabs, TabItem } from '@aws-amplify/ui-react';

export const AriaLabel = () => (
  <Tabs ariaLabel="fruits">
    <TabItem title="Apples">
      Play with the Tab and Arrow keys to engage with this component.
    </TabItem>
    <TabItem title="Bananas">
      Notice how an outline is added when the :focus-visible pseudo-class is
      applied.
    </TabItem>
  </Tabs>
);
