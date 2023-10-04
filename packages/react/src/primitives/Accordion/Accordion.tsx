import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassName, isFunction } from '@aws-amplify/ui';
import { BaseAccordionProps, AccordionProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionContent } from './AccordionContent';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionIcon } from './AccordionIcon';

const AccordionPrimitive: Primitive<AccordionProps, 'div'> = (
  {
    children,
    className,
    defaultValue,
    allowMultiple,
    allowToggle,
    onChange,
    testId,
    value: controlledValue,
    items,
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
       * has allowToggle (meaning all items can be collapsed) OR if the Accordion's value array is
       * more than 1 so that at least 1 will still be open.
       * If the Accordion array doesn't have the incoming item value, that means we want to open
       * the item, BUT if the Accordion only allows 1 item to be open at a time then
       * replace the array with an array of only the item value.
       */
      const newValue = value.includes(_value)
        ? allowToggle || value.length > 1
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
    [onChange, value, isControlled, allowMultiple, allowToggle]
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
        {children
          ? children
          : items?.map((item) => (
              <AccordionItem key={item.value} {...item}>
                <AccordionTrigger>
                  {item.trigger}
                  <AccordionIcon />
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
      </View>
    </AccordionContext.Provider>
  );
};

type AccordionType = ForwardRefPrimitive<BaseAccordionProps, 'div'> & {
  Item: typeof AccordionItem;
  Content: typeof AccordionContent;
  Trigger: typeof AccordionTrigger;
  Icon: typeof AccordionIcon;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
const Accordion: AccordionType = Object.assign(
  React.forwardRef(AccordionPrimitive),
  {
    Item: AccordionItem,
    Content: AccordionContent,
    Trigger: AccordionTrigger,
    Icon: AccordionIcon,
  }
);

Accordion.displayName = 'Accordion';

export { Accordion };
