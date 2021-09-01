import React from 'react';
import {
  Root,
  List,
  Trigger as RadixTab,
  Content as Panel,
} from '@radix-ui/react-tabs';
import { TabsProps, TabItemProps } from '../types';
import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';

export const isTabsType = (
  child: any
): child is React.Component<TabItemProps> => {
  return (
    typeof child === 'object' &&
    child.hasOwnProperty('props') &&
    child.props.title != null &&
    child.props.children != null
  );
};

export interface Tabs {
  (props: TabsProps):
    | React.ReactElement<any, any>
    | React.ReactElement[]
    | null;
}

export const Tabs: Tabs = ({
  alignContent,
  alignItems,
  ariaLabel,
  children,
  className,
  defaultTabIndex = 0,
  direction,
  disabledTabs,
  gap = '0',
  grow,
  justifyContent,
  wrap,
  ...rest
}) => {
  const tabs = React.Children.map(children, (child) => {
    if (!isTabsType(child)) return null; // console.warn, only pass TabItem's
    return {
      title: child.props.title,
      panel: child.props.children,
    };
  });

  return (
    <Root defaultValue={`${defaultTabIndex}`}>
      <List aria-label={ariaLabel}>
        <Flex
          alignContent={alignContent}
          alignItems={alignItems}
          className={ComponentClassNames.TabList}
          direction={direction}
          gap={gap}
          justifyContent={justifyContent}
          wrap={wrap}
        >
          {tabs.map((tab, index) => (
            <RadixTab
              className={classNames(ComponentClassNames.Tabs, className)}
              data-grow={grow}
              disabled={disabledTabs && disabledTabs.includes(index)}
              value={`${index}`}
            >
              {tab.title}
            </RadixTab>
          ))}
        </Flex>
      </List>
      {tabs.map((tab, index) => (
        <Panel value={`${index}`}>{tab.panel}</Panel>
      ))}
    </Root>
  );
};

// In the docs, explain that TabItem contains both Tab and it's corresponding Panel
export const TabItem: React.FC<TabItemProps> = () => <></>;
