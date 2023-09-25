import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassName, isFunction } from '@aws-amplify/ui';
import { BaseExpanderGroupProps, ExpanderGroupProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { ExpanderGroupContext } from './ExpanderGroupContext';

const ExpanderGroupPrimitive: Primitive<ExpanderGroupProps, 'div'> = (
  {
    children,
    className,
    defaultValue,
    isCollapsible,
    multiple,
    onValueChange,
    testId,
    value: controlledValue,
    ...rest
  },
  ref
) => {
  const isControlled = controlledValue !== undefined;
  const [localValue, setLocalValue] = React.useState(() =>
    isControlled ? controlledValue : defaultValue ?? []
  );
  const value = isControlled ? controlledValue : localValue;

  const setValue = React.useCallback(
    (_value: string) => {
      /**
       * This code looks a bit complex, but here is what it is doing:
       * if the current value (which is an array of string values of expanders that are currently open)
       * has the incoming expander value then we want to remove it (aka collapse it) if the ExpanderGroup
       * has isCollapsible (meaning all expanders can be collapsed) OR if the ExpanderGroup array is
       * more than 1 so that at least 1 will still be open.
       * If the ExpanderGroup array doesn't have the incoming Expander value, that means we want to open
       * the Expander, BUT if the ExpanderGroup only allows 1 Expander to be open at a time then
       * replace the array with an array of only the Expander value.
       */
      const newValue = value.includes(_value)
        ? isCollapsible || value.length > 1
          ? value.filter((v) => v !== _value)
          : value
        : multiple
        ? [...value, _value]
        : [_value];

      if (isFunction(onValueChange)) {
        onValueChange(newValue);
      }

      if (!isControlled) {
        setLocalValue(newValue);
      }
    },
    [onValueChange, value, isControlled, isCollapsible, multiple]
  );

  const _value = React.useMemo(() => {
    return {
      value,
      setValue,
    };
  }, [value, setValue]);

  return (
    <ExpanderGroupContext.Provider value={_value}>
      <View
        {...rest}
        className={classNames(ComponentClassName.Expander, className)}
        data-testid={testId}
        ref={ref}
      >
        {children}
      </View>
    </ExpanderGroupContext.Provider>
  );

  // const expander =
  //   type === 'multiple' ? (

  //     <Root
  //       className={classNames(ComponentClassName.Expander, className)}
  //       data-testid={testId}
  //       defaultValue={defaultValue as string[]}
  //       onValueChange={onValueChange as (value?: string[]) => void}
  //       ref={ref}
  //       type={type}
  //       value={value as string[]}
  //       {...rest}
  //     >
  //       {children}
  //     </Root>
  //   ) : (
  //     <Root
  //       className={classNames(ComponentClassName.Expander, className)}
  //       collapsible={isCollapsible}
  //       data-testid={testId}
  //       defaultValue={defaultValue as string}
  //       onValueChange={handleValueChange as (value?: string) => void}
  //       ref={ref}
  //       type={type}
  //       value={value as string}
  //       {...rest}
  //     >
  //       {children}
  //     </Root>
  //   );

  // return expander;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/expander)
 */
export const ExpanderGroup: ForwardRefPrimitive<BaseExpanderGroupProps, 'div'> =
  React.forwardRef(ExpanderGroupPrimitive);

ExpanderGroup.displayName = 'ExpanderGroup';
