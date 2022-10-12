import React, { Children, isValidElement } from 'react';
import { View } from 'react-native';
import { TabProps, TabsProps } from './types';
// import { styles } from './styles';
import { Button } from '../Button';

// The Tab is just a convenient API
export const Tab = ({ title, ...rest }: TabProps): JSX.Element => {
  // selected and disabled styles
  // if this is a Button, then we should just cloneElement later
  return <Button {...rest}>{title}</Button>;
};

// here, we're just grabbing the title and children from the Tab
const tabUtil = (children: TabsProps['children']) => {
  const tabs: string[] = [];
  const panels: React.ReactNode[] = [];

  // refactor to use reduce
  Children.forEach(children, (child) => {
    if (isValidElement<TabProps>(child)) {
      const { title, children } = child.props;
      tabs.push(title);
      panels.push(children);
    }
  });

  return { tabs, panels };
};

export default function Tabs({
  // accessibilityRole = 'text',
  children,
  onChange,
  selectedIndex = 0,
}: // style,
// ...rest
TabsProps): JSX.Element {
  const { tabs, panels } = tabUtil(children);

  return (
    <View>
      <View>
        {tabs.map((tab, index) => {
          // for styling purposes
          // const isSelected = index === selectedIndex;

          // this could just be cloneElement, and add key and onPress props (maybe style too, and disabled)
          return (
            <Button key={index} onPress={() => onChange?.(index)}>
              {tab}
            </Button>
          );
        })}
      </View>
      {panels[selectedIndex]}
    </View>
  );
}
