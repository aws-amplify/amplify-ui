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

/*

Basically, we need to iterate over the children of Tabs (each individual Tab), pull out the necessary data, and give it to Radix in the way that it expects

Then, the challenge is custom styling

<Tabs className={ } aria-label="Manage your account">
  <Tab title={ } key={ }>
    Content stuff filler lorem
  </Tab>

  <Tab title={ }>
    Content stuff filler lorem
  </Tab>
</Tabs>


API
- title (string)
- defaultValue (string)


*/

export const Tabs: React.FC<TabsProps> = ({
  className,
  children,
  ariaLabel,
  defaultTabIndex = 0,
  ...rest
}) => {
  const tabsData = React.Children.map(children, (child) => {
    return {
      tab: child['props'].title,
      panel: child['props'].children,
    };
  });

  return (
    <Root defaultValue={`${defaultTabIndex}`}>
      <List aria-label={ariaLabel}>
        <Flex>
          {tabsData.map((x, i) => (
            <RadixTab
              value={`${i}`}
              className={classNames(ComponentClassNames.Tabs, className)}
            >
              {x.tab}
            </RadixTab>
          ))}
        </Flex>
      </List>
      {tabsData.map((x, i) => (
        <Panel value={`${i}`}>{x.panel}</Panel>
      ))}
    </Root>
  );
};

export const Tab = ({ title, children }) => <></>;

/*

  <RadixTab value="tab1">Account</RadixTab>
  <RadixTab value="tab2">Password</RadixTab>

  <Panel value="tab1">This is the Panel in the Account tab</Panel>
  <Panel value="tab2">Don't tell anyone your password shh!</Panel>
  
*/
