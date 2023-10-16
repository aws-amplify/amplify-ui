import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName, isFunction } from '@aws-amplify/ui';
import { ElementType, PrimitiveProps } from '../types/view';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { BaseAccordionProps } from './types';
import { AccordionContext } from './AccordionContext';

interface BaseAccordionContainerProps
  extends Omit<BaseAccordionProps, 'items'> {}

type AccordionContainerProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseAccordionContainerProps, Element>;

const AccordionContainerPrimitive: Primitive<AccordionContainerProps, 'div'> = (
  {
    children,
    className,
    defaultValue,
    allowMultiple,
    isAlwaysOpen,
    onChange,
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
       * if the current value (which is an array of string values of items that are currently open)
       * has the incoming item value then we want to remove it (aka collapse it) if the Accordion
       * has isAlwaysOpen set to false (meaning all items can be collapsed) OR if the Accordion's value array is
       * more than 1 so that at least 1 will still be open.
       * If the Accordion array doesn't have the incoming item value, that means we want to open
       * the item, BUT if the Accordion only allows 1 item to be open at a time then
       * replace the array with an array of only the item value.
       */
      const newValue = value.includes(_value)
        ? !isAlwaysOpen || value.length > 1
          ? value.filter((v) => v !== _value)
          : value
        : allowMultiple
        ? [...value, _value]
        : [_value];

      if (isFunction(onChange)) {
        onChange(newValue);
      }

      if (!isControlled) {
        setLocalValue(newValue);
      }
    },
    [onChange, value, isControlled, allowMultiple, isAlwaysOpen]
  );

  const contextValue = React.useMemo(() => {
    return {
      value,
      setValue,
    };
  }, [value, setValue]);
  return (
    <AccordionContext.Provider value={contextValue}>
      <View
        {...rest}
        className={classNames(ComponentClassName.Accordion, className)}
        data-testid={testId}
        ref={ref}
      >
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
export const AccordionContainer: ForwardRefPrimitive<
  BaseAccordionContainerProps,
  'div'
> = React.forwardRef(AccordionContainerPrimitive);

AccordionContainer.displayName = 'Accordion.Container';
