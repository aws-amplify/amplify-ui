import { Tabs } from '@aws-amplify/ui-react';

export const AriaLabel = () => (
  <Tabs ariaLabel="fruits" defaultValue="Apples">
    <Tabs.List>
      <Tabs.Tab value="Apples">Apples</Tabs.Tab>
      <Tabs.Tab value="Bananas">Bananas</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="Apples">
      Play with the Tab and Arrow keys to engage with this component.
    </Tabs.Panel>
    <Tabs.Panel value="Bananas">
      Notice how an outline is added when the :focus-visible pseudo-class is
      applied.
    </Tabs.Panel>
  </Tabs>
);
