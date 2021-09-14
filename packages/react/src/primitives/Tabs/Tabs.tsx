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

const isTabsType = (child: any): child is React.Component<TabItemProps> => {
  return (
    typeof child === 'object' &&
    child.hasOwnProperty('props') &&
    child.props.title != null &&
    child.props.children != null
  );
};
export interface Tabs {
  (props: TabsProps): React.ReactComponentElement<any>;
}

export const Tabs: Tabs = ({
  alignContent,
  alignItems,
  ariaLabel,
  children,
  className,
  defaultIndex = 0,
  indicatorPosition,
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
    <Root defaultValue={`${defaultIndex}`}>
      <List aria-label={ariaLabel}>
        <Flex
          alignContent={alignContent}
          alignItems={alignItems}
          className={classNames(ComponentClassNames.Tabs, className)}
          direction={direction}
          gap={gap}
          justifyContent={justifyContent}
          wrap={wrap}
          data-indicator-position={indicatorPosition}
          {...rest}
        >
          {tabs.map(({ className, isDisabled, title, ...rest }, index) => (
            <RadixTab
              className={classNames(ComponentClassNames.TabItems, className)}
              data-grow={grow}
              disabled={isDisabled}
              key={index}
              style={prefixer(convertStylePropsToStyleObj(rest, {}))}
              value={`${index}`}
            >
              {title}
            </RadixTab>
          ))}
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

export const TabItem: React.FC<TabItemProps> = () => <></>;
