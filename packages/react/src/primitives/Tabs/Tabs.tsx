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

export const Tabs: React.FC<TabsProps> = ({
  className,
  children,
  ariaLabel,
  defaultTabIndex = 0,
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
      <List aria-label={ariaLabel} style={{ borderBottom: '1px solid gray' }}>
        <Flex>
          {tabs.map((tab, index) => (
            <RadixTab
              value={`${index}`}
              className={classNames(ComponentClassNames.Tabs, className)}
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
export const TabItem: React.FC<TabItemProps> = () => null;
