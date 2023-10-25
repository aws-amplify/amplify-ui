import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, ComponentClassName } from '@aws-amplify/ui';

import { ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { BaseTabsListProps, TabsListProps, TabsItemProps } from './types';
import { TabsContext } from './TabsContext';

const isValidTab = (
  child: React.ReactFragment | React.ReactChild | React.ReactPortal
): child is React.ReactElement<TabsItemProps> =>
  React.isValidElement<TabsItemProps>(child);

const TabListPrimitive: Primitive<TabsListProps, 'div'> = (
  {
    className,
    children,
    indicatorPosition,
    spacing,
    role = 'tablist',
    ...rest
  },
  ref
) => {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  React.useImperativeHandle(ref, () => internalRef.current!);
  const values = React.useMemo(
    () =>
      React.Children.toArray(children)
        .map((child) => {
          if (child && isValidTab(child)) {
            return child.props.value;
          }
        })
        .filter((child) => !!child),
    [children]
  );

  const currentIndex = values.indexOf(activeTab);

  const nextTab = React.useCallback(() => {
    let nextIndex = currentIndex === values.length - 1 ? 0 : currentIndex + 1;
    const elems = internalRef.current?.querySelectorAll('button') ?? [];

    while (elems[nextIndex].disabled) {
      if (nextIndex === values.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex++;
      }
    }

    const value = values[nextIndex];
    if (value) {
      setActiveTab(value);
      const elem = elems[nextIndex];
      elem?.focus();
      elem?.click();
    }
  }, [currentIndex, setActiveTab, values]);

  const prevTab = React.useCallback(() => {
    let prevIndex = currentIndex === 0 ? values.length - 1 : currentIndex - 1;
    const elems = internalRef.current?.querySelectorAll('button') ?? [];

    while (elems[prevIndex].disabled) {
      if (prevIndex === 0) {
        prevIndex = values.length - 1;
      } else {
        prevIndex--;
      }
    }

    const value = values[prevIndex];
    if (value) {
      setActiveTab(value);
      const elem = elems[prevIndex];
      elem?.focus();
      elem?.click();
    }
  }, [currentIndex, setActiveTab, values]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          event.stopPropagation();
          prevTab();
          break;
        case 'ArrowUp':
        case 'ArrowRight':
          event.preventDefault();
          event.stopPropagation();
          nextTab();
          break;
        case 'ArrowDown':
        default:
          break;
      }
    },
    [prevTab, nextTab]
  );
  return (
    <View
      {...rest}
      role={role}
      onKeyDown={onKeyDown}
      className={classNames(
        ComponentClassName.TabsList,
        indicatorPosition
          ? classNameModifier(ComponentClassName.TabsList, indicatorPosition)
          : null,
        spacing
          ? classNameModifier(ComponentClassName.TabsList, spacing)
          : null,
        className
      )}
      ref={internalRef}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/tabs)
 */
export const TabList: ForwardRefPrimitive<BaseTabsListProps, 'div'> =
  primitiveWithForwardRef(TabListPrimitive);

TabList.displayName = 'Tabs.List';
