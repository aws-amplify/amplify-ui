import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassName, isFunction } from '@aws-amplify/ui';
import { BaseAccordionProps, AccordionProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';

const AccordionPrimitive: Primitive<AccordionProps, 'div'> = (
  {
    children,
    className,
    defaultValue,
    isCollapsible,
    isExclusive,
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
        : isExclusive
        ? [_value]
        : [...value, _value];

      if (isFunction(onChange)) {
        onChange(newValue);
      }

      if (!isControlled) {
        setLocalValue(newValue);
      }
    },
    [onChange, value, isControlled, isCollapsible, isExclusive]
  );

  const _value = React.useMemo(() => {
    return {
      value,
      setValue,
    };
  }, [value, setValue]);

  return (
    <AccordionContext.Provider value={_value}>
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

type AccordionType = ForwardRefPrimitive<BaseAccordionProps, 'div'> & {
  Item: typeof AccordionItem;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
const Accordion: AccordionType = Object.assign(
  React.forwardRef(AccordionPrimitive),
  {
    Item: AccordionItem,
  }
);

Accordion.displayName = 'Accordion';

export { Accordion };
