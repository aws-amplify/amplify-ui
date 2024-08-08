import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName, isFunction } from '@aws-amplify/ui';
import { ForwardRefPrimitive, Primitive } from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { BaseTabsProps, TabsProps } from './types';
import { View } from '../View';
import { TabsContext } from './TabsContext';
import { useStableId } from '../utils/useStableId';

const TabsContainerPrimitive: Primitive<TabsProps, 'div'> = (
  {
    children,
    defaultValue,
    className,
    value: controlledValue,
    onValueChange,
    isLazy,
    ...rest
  }: BaseTabsProps,
  ref
) => {
  const groupId = useStableId(); // groupId is used to ensure uniqueness between Tab Groups in IDs
  const isControlled = controlledValue !== undefined;
  const [localValue, setLocalValue] = React.useState(() =>
    isControlled ? controlledValue : defaultValue
  );
  const activeTab = isControlled ? controlledValue : localValue ?? '';

  const setActiveTab = React.useCallback(
    (newValue: string) => {
      if (isFunction(onValueChange)) {
        onValueChange(newValue);
      }

      if (!isControlled) {
        setLocalValue(newValue);
      }
    },
    [onValueChange, isControlled]
  );

  const _value = React.useMemo(() => {
    return {
      activeTab,
      isLazy,
      setActiveTab,
      groupId,
    };
  }, [activeTab, setActiveTab, isLazy, groupId]);

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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const TabsContainer: ForwardRefPrimitive<BaseTabsProps, 'div'> =
  primitiveWithForwardRef(TabsContainerPrimitive);

TabsContainer.displayName = 'Tabs.Container';
