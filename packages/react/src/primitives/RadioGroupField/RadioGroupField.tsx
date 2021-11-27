import * as React from 'react';
import classNames from 'classnames';

import { RadioGroupContext, RadioGroupContextType } from './context';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { RadioGroupFieldProps, PrimitiveWithForwardRef } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../shared/utils';

// Note: RadioGroupField doesn't extend the JSX.IntrinsicElements<'input'> types (instead extending 'typeof Flex')
// because all rest props are passed to Flex container
const RadioGroupFieldPrimitive: PrimitiveWithForwardRef<
  RadioGroupFieldProps,
  typeof Flex
> = (
  {
    children,
    className,
    defaultValue,
    descriptiveText,
    errorMessage,
    hasError = false,
    id,
    isDisabled,
    isRequired,
    isReadOnly,
    label,
    labelHidden = false,
    onChange,
    name,
    size,
    value,
    ...rest
  },
  ref
) => {
  const fieldId = useStableId(id);
  const radioGroupContextValue: RadioGroupContextType = React.useMemo(
    () => ({
      currentValue: value,
      defaultValue,
      hasError,
      isRequired,
      isReadOnly,
      isGroupDisabled: isDisabled,
      onChange,
      size,
      name,
    }),
    [
      defaultValue,
      hasError,
      isDisabled,
      isRequired,
      isReadOnly,
      onChange,
      size,
      name,
      value,
    ]
  );

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.RadioGroupField,
        className
      )}
      data-size={size}
      ref={ref}
      {...rest}
    >
      <Label id={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <Flex
        aria-labelledby={fieldId}
        className={ComponentClassNames.RadioGroup}
        role="radiogroup"
      >
        <RadioGroupContext.Provider value={radioGroupContextValue}>
          {children}
        </RadioGroupContext.Provider>
      </Flex>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const RadioGroupField = React.forwardRef(RadioGroupFieldPrimitive);

RadioGroupField.displayName = 'RadioGroupField';
