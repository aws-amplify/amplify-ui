import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import {
  ComponentClassName,
  classNameModifierByFlag,
  isFunction,
} from '@aws-amplify/ui';

import type { ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import type { BaseTabsItemProps, TabsItemProps } from './types';
import { TabsContext } from './TabsContext';
import { WHITESPACE_VALUE } from './constants';

const TabsItemPrimitive: Primitive<TabsItemProps, 'button'> = (
  { className, value, children, onClick, as = 'button', role = 'tab', ...rest },
  ref
) => {
  const { activeTab, setActiveTab, groupId } = React.useContext(TabsContext);
  let idValue = value;
  if (typeof idValue === 'string') {
    idValue = idValue.replace(' ', WHITESPACE_VALUE);
  }
  const isActive = activeTab === value;
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isFunction(onClick)) {
      onClick?.(e);
    }
    setActiveTab(value);
  };
  return (
    <View
      {...rest}
      role={role}
      as={as}
      id={`${groupId}-tab-${idValue}`}
      aria-selected={isActive}
      aria-controls={`${groupId}-panel-${idValue}`}
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
