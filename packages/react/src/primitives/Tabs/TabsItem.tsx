import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import {
  ComponentClassName,
  classNameModifierByFlag,
  isTypedFunction,
} from '@aws-amplify/ui';

import { ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { BaseTabsItemProps, TabsItemProps } from './types';
import { TabsContext } from './TabsContext';

const TabsItemPrimitive: Primitive<TabsItemProps, 'button'> = (
  { className, value, children, onClick, as = 'button', role = 'tab', ...rest },
  ref
) => {
  const { activeTab, setActiveTab, groupId, whitespaceValue } =
    React.useContext(TabsContext);
  const isActive = activeTab === value;
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTypedFunction(onClick)) {
      onClick?.(e);
    }
    setActiveTab(value);
  };
  value = value.replace(' ', whitespaceValue);
  return (
    <View
      {...rest}
      role={role}
      as={as}
      id={`${groupId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${groupId}-panel-${value}`}
      tabIndex={!isActive ? -1 : undefined}
      className={classNames(
        ComponentClassName.TabsItem,
        classNameModifierByFlag(
          ComponentClassName.TabsItem,
          'active',
          activeTab === value
        ),
        className
      )}
      ref={ref}
      onClick={handleOnClick}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const TabsItem: ForwardRefPrimitive<BaseTabsItemProps, 'button'> =
  primitiveWithForwardRef(TabsItemPrimitive);

TabsItem.displayName = 'Tabs.Item';
