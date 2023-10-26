import * as React from 'react';
import { ForwardRefPrimitive, Primitive } from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { BaseTabsProps, TabsProps } from './types';
import { TabsItem } from './TabsItem';
import { TabList } from './TabsList';
import { TabPanel } from './TabsPanel';
import { TabsContainer } from './TabsContainer';

const TabsPrimitive: Primitive<TabsProps, 'div'> = (
  { items, indicatorPosition, justifyContent, spacing, ...rest }: BaseTabsProps,
  ref
) => {
  return (
    <TabsContainer {...rest} ref={ref}>
      <TabList
        indicatorPosition={indicatorPosition}
        justifyContent={justifyContent}
        spacing={spacing}
      >
        {items?.map(({ value, label, content, ...rest }) => (
          <TabsItem {...rest} key={value} value={value}>
            {label}
          </TabsItem>
        ))}
      </TabList>
      {items?.map(({ value, content, isDisabled }) => (
        <TabPanel key={value} value={value} isDisabled={isDisabled}>
          {content}
        </TabPanel>
      ))}
    </TabsContainer>
  );
};

type TabsType = ForwardRefPrimitive<BaseTabsProps, 'div'> & {
  Panel: typeof TabPanel;
  Item: typeof TabsItem;
  List: typeof TabList;
  Container: typeof TabsContainer;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const Tabs: TabsType = Object.assign(
  primitiveWithForwardRef(TabsPrimitive),
  {
    Item: TabsItem,
    List: TabList,
    Panel: TabPanel,
    Container: TabsContainer,
  }
);

Tabs.displayName = 'Tabs';
