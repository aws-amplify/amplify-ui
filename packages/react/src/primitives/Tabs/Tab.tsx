import * as React from 'react';
import classNames from 'classnames';

import {
  ComponentClassName,
  classNameModifierByFlag,
  isTypedFunction,
} from '@aws-amplify/ui';

import { ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';
import { BaseTabProps, TabProps } from './types';
import { TabsContext } from './TabsContext';

const TabPrimitive: Primitive<TabProps, 'button'> = (
  { className, value, children, onClick, as = 'button', role = 'tab', ...rest },
  ref
) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTypedFunction(onClick)) {
      onClick(e);
    }
    setActiveTab(value);
  };

  return (
    <View
      {...rest}
      role={role}
      as={as}
      id={value}
      aria-selected={isActive}
      aria-controls={`${value}-panel`}
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
export const Tab: ForwardRefPrimitive<BaseTabProps, 'button'> =
  React.forwardRef(TabPrimitive);

Tab.displayName = 'Tabs.Tab';
