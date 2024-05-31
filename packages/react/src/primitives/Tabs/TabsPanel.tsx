import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName, classNameModifierByFlag } from '@aws-amplify/ui';

import { ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';
import { BaseTabsPanelProps, TabsPanelProps } from './types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { TabsContext } from './TabsContext';
import { useStableId } from '../utils/useStableId';

const TabPanelPrimitive: Primitive<TabsPanelProps, 'div'> = (
  { className, value, children, role = 'tabpanel', ...rest },
  ref
) => {
  const { activeTab, isLazy } = React.useContext(TabsContext);
  const idValue = useStableId();

  if (isLazy && activeTab !== value) return null;

  return (
    <View
      {...rest}
      role={role}
      id={`${idValue}-panel`}
      aria-labelledby={`${idValue}-tab`}
      className={classNames(
        ComponentClassName.TabsPanel,
        classNameModifierByFlag(
          ComponentClassName.TabsPanel,
          'active',
          activeTab === value
        ),
        className
      )}
      ref={ref}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const TabPanel: ForwardRefPrimitive<BaseTabsPanelProps, 'div'> =
  primitiveWithForwardRef(TabPanelPrimitive);

TabPanel.displayName = 'Tabs.Panel';
