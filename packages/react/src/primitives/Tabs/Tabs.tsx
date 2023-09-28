import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName, isFunction } from '@aws-amplify/ui';
import { ForwardRefPrimitive, Primitive } from '../types';
import { BaseTabsProps, TabsProps } from './types';
import { View } from '../View';
import { TabsContext } from './TabsContext';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';

const TabsPrimitive: Primitive<TabsProps, 'div'> = (
  {
    children,
    defaultValue,
    className,
    value: controlledValue,
    onChange,
    ...rest
  }: BaseTabsProps,
  ref
) => {
  const isControlled = controlledValue !== undefined;
  const [localValue, setLocalValue] = React.useState(() =>
    isControlled ? controlledValue : defaultValue
  );
  const activeTab = isControlled ? controlledValue : localValue ?? '';

  const setActiveTab = React.useCallback(
    (newValue: string) => {
      if (isFunction(onChange)) {
        onChange(newValue);
      }

      if (!isControlled) {
        setLocalValue(newValue);
      }
    },
    [onChange, isControlled]
  );

  const _value = React.useMemo(() => {
    return {
      activeTab,
      setActiveTab,
    };
  }, [activeTab, setActiveTab]);

  return (
    <TabsContext.Provider value={_value}>
      <View
        {...rest}
        ref={ref}
        className={classNames(className, ComponentClassName.Tabs)}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
};

type TabsType = ForwardRefPrimitive<BaseTabsProps, 'div'> & {
  Panel: typeof TabPanel;
  Tab: typeof Tab;
  List: typeof TabList;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const Tabs: TabsType = Object.assign(React.forwardRef(TabsPrimitive), {
  Tab,
  List: TabList,
  Panel: TabPanel,
});

Tabs.displayName = 'Tabs';
