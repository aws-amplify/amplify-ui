import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName, classNameModifierByFlag } from '@aws-amplify/ui';

import { ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';
import { BaseTabProps, TabProps } from './types';
import { TabsContext } from './TabsContext';

const TabPrimitive: Primitive<TabProps, 'button'> = (
  { className, value, children, as = 'button', role = 'tab', ...rest },
  ref
) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;
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
      onClick={() => {
        setActiveTab(value);
      }}
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
