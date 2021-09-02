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
import { convertStylePropsToStyleObj, prefixer } from '../shared/utils';

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
  defaultTab = 0,
  direction,
  gap = '0',
  grow,
  justifyContent,
  wrap,
  ...rest
}) => {
  const tabs = React.Children.map(children, (child) => {
    if (!isTabsType(child)) {
      console.warn(
        'Amplify UI: <Tabs> component only accepts <TabItem> as children.'
      );
      return null;
    }

    return child.props;
  });

  return (
    <Root defaultValue={`${defaultTab}`}>
      <List aria-label={ariaLabel}>
        <Flex
          alignContent={alignContent}
          alignItems={alignItems}
          className={classNames(ComponentClassNames.Tabs, className)}
          direction={direction}
          gap={gap}
          justifyContent={justifyContent}
          wrap={wrap}
          {...rest}
        >
          {tabs.map(({ className, isDisabled, title, ...rest }, index) => (
            <RadixTab
              className={classNames(ComponentClassNames.TabItems, className)}
              data-grow={grow}
              disabled={isDisabled}
              value={`${index}`}
              style={prefixer(convertStylePropsToStyleObj(rest, {}))}
            >
              {title}
            </RadixTab>
          ))}
        </Flex>
      </List>
      {tabs.map((tab, index) => (
        <Panel value={`${index}`}>{tab.children}</Panel>
      ))}
    </Root>
  );
};

// In the docs, explain that TabItem contains both Tab and its corresponding Panel
export const TabItem: React.FC<TabItemProps> = () => <></>;
