import React from 'react';
import {
  Root,
  List,
  Trigger as RadixTab,
  Content as Panel,
} from '@radix-ui/react-tabs';
import { TabsProps } from '../types';
import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';

export const Tabs: React.FC<TabsProps> = ({
  className,
  children,
  ariaLabel,
  defaultTabIndex = 0,
  ...rest
}) => {
  const tabs = React.Children.map(children, (child) => {
    return {
      tab: child['props'].title,
      panel: child['props'].children,
    };
  });

  return (
    <Root defaultValue={`${defaultTabIndex}`}>
      <List aria-label={ariaLabel} style={{ borderBottom: '1px solid gray' }}>
        <Flex>
          {tabs.map((x, i) => (
            <RadixTab
              value={`${i}`}
              className={classNames(ComponentClassNames.Tabs, className)}
            >
              {x.tab}
            </RadixTab>
          ))}
        </Flex>
      </List>
      {tabs.map((x, i) => (
        <Panel value={`${i}`}>{x.panel}</Panel>
      ))}
    </Root>
  );
};

interface TabProps {
  title: React.ReactNode;
}

export const Tab: React.FC<TabProps> = () => <></>;
