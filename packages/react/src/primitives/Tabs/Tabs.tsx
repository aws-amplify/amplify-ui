import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { Flex } from '../Flex';
// import { ComponentClassNames } from '../shared/constants';
// import classNames from 'classnames';

export const Tabs = () => {
  return (
    <RadixTabs.Root defaultValue="tab1">
      <RadixTabs.List aria-label="Manage your account">
        <Flex>
          <RadixTabs.Trigger value="tab1">Account</RadixTabs.Trigger>
          <RadixTabs.Trigger value="tab2">Password</RadixTabs.Trigger>
        </Flex>
      </RadixTabs.List>
      <RadixTabs.Content value="tab1">
        This is the content in the Account tab
      </RadixTabs.Content>
      <RadixTabs.Content value="tab2">
        Don't tell anyone your password shh!
      </RadixTabs.Content>
    </RadixTabs.Root>
  );
};
