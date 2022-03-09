import classNames from 'classnames';
import {
  Root,
  List,
  Trigger as RadixTab,
  Content as Panel,
} from '@radix-ui/react-tabs';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { TabsProps, TabItemProps, Primitive } from '../types';
import { View } from '../View';

const isTabsType = (child: any): child is React.Component<TabItemProps> => {
  return (
    child !== null &&
    typeof child === 'object' &&
    child.hasOwnProperty('props') &&
    child.props.title != null
  );
};

const TabsPrimitive: Primitive<TabsProps, typeof Flex> = (
  {
    ariaLabel,
    children,
    className,
    defaultIndex = 0,
    currentIndex,
    onChange,
    indicatorPosition,
    spacing,
    ...rest
  }: TabsProps,
  ref
) => {
  const tabs = React.Children.map(children, (child) => {
    if (child === null) return {};

    // checking if the child is a whitespace character
    if (typeof child === 'string' && /\s/.test(child)) {
      return {};
    }

    if (!isTabsType(child)) {
      console.warn(
        'Amplify UI: <Tabs> component only accepts <TabItem> as children.'
      );
      return {};
    }

    return child.props;
  });

  // mapping our props to Radix's props
  // value (currentIndex) and defaultValue (defaultIndex) must be strings
  // https://www.radix-ui.com/docs/primitives/components/tabs#api-reference
  const rootProps = {
    defaultValue: defaultIndex.toString(),
    // only pass value/currentIndex prop if it is defined
    value: currentIndex != null ? currentIndex.toString() : undefined,
    onValueChange: onChange,
  };
  return (
    <Root {...rootProps}>
      <List aria-label={ariaLabel}>
        <Flex
          className={classNames(ComponentClassNames.Tabs, className)}
          data-indicator-position={indicatorPosition}
          ref={ref}
          {...rest}
        >
          {React.Children.map(children, (child, index) => {
            if (!isTabsType(child)) {
              return null;
            }

            return React.cloneElement(child, {
              ['data-spacing']: spacing,
              key: index,
              value: `${index}`,
            });
          })}
        </Flex>
      </List>
      {tabs.map((tab, index) => (
        <Panel key={index} value={`${index}`}>
          {tab.children}
        </Panel>
      ))}
    </Root>
  );
};

const TabItemPrimitive: Primitive<TabItemProps, 'button'> = (
  { className, title, ...rest },
  ref
) => (
  <View
    as={RadixTab}
    className={classNames(ComponentClassNames.TabItems, className)}
    ref={ref}
    {...rest}
  >
    {title}
  </View>
);

export const Tabs = React.forwardRef(TabsPrimitive);
export const TabItem = React.forwardRef(TabItemPrimitive);

Tabs.displayName = 'Tabs';
TabItem.displayName = 'TabItem';
