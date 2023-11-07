import * as React from 'react';
import { Tabs, TabsProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { TabsPropControls } from './TabsPropControls';
import { useTabsProps } from './useTabsProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props) => {
  return (
    `<Tabs` +
    `${props.spacing ? `\n  spacing="${props.spacing}"` : ``}` +
    `\n  justifyContent="${props.justifyContent}"` +
    `${
      props.indicatorPosition
        ? `\n  indicatorPosition="${props.indicatorPosition}"`
        : ``
    }` +
    `\n  defaultValue='Tab 1'` +
    `\n  items={[
    { label: 'Tab 1', value: 'Tab 1', content: 'Tab content #1' },
    { label: 'Tab 2', value: 'Tab 2', content: 'Tab content #2' },
    { label: 'Disabled tab', value: 'Tab 3', content: 'Tab content #3', isDisabled: true },
  ]}
/>`
  );
};

const defaultTabsProps = {
  justifyContent: 'flex-start',
};

export const TabsDemo = () => {
  const tabsProps = useTabsProps(
    (demoState.get(Tabs.displayName) as TabsProps) || defaultTabsProps
  );

  return (
    <Demo
      code={propsToCode(tabsProps)}
      propControls={<TabsPropControls {...tabsProps} />}
    >
      <Tabs
        spacing={tabsProps.spacing}
        justifyContent={tabsProps.justifyContent}
        indicatorPosition={tabsProps.indicatorPosition}
        defaultValue={'Tab 1'}
        items={[
          { label: 'Tab 1', value: 'Tab 1', content: 'Tab content #1' },
          { label: 'Tab 2', value: 'Tab 2', content: 'Tab content #2' },
          {
            label: 'Disabled tab',
            value: 'Tab 3',
            content: 'Tab content #3',
            isDisabled: true,
          },
        ]}
      />
    </Demo>
  );
};
