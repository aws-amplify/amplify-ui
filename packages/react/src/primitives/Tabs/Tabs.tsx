import * as React from 'react';
import { ForwardRefPrimitive, Primitive } from '../types';
import { BaseTabsProps, TabsProps } from './types';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import { TabsContainer } from './TabsContainer';

const TabsPrimitive: Primitive<TabsProps, 'div'> = (
  { items, ...rest }: BaseTabsProps,
  ref
) => {
  return (
    <TabsContainer {...rest} ref={ref}>
      <TabList>
        {items?.map((item) => (
          <Tab key={item.value} value={item.value}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      {items?.map((item) => (
        <TabPanel key={item.value} value={item.value}>
          {item.content}
        </TabPanel>
      ))}
    </TabsContainer>
  );
};

type TabsType = ForwardRefPrimitive<BaseTabsProps, 'div'> & {
  Panel: typeof TabPanel;
  Tab: typeof Tab;
  List: typeof TabList;
  Container: typeof TabsContainer;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const Tabs: TabsType = Object.assign(React.forwardRef(TabsPrimitive), {
  Tab,
  List: TabList,
  Panel: TabPanel,
  Container: TabsContainer,
});

Tabs.displayName = 'Tabs';
