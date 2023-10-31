import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Fieldset } from '../Fieldset';
import { Flex } from '../Flex';
import { RadioGroupContext, RadioGroupContextType } from './context';
import {
  BaseRadioGroupFieldProps,
  RadioGroupFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { getTestId } from '../utils/getTestId';
import { useStableId } from '../utils/useStableId';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const RadioGroupFieldPrimitive: Primitive<RadioGroupFieldProps, 'fieldset'> = (
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
    legend,
    legendHidden = false,
    labelPosition,
    onChange,
    name,
    size,
    testId,
    value,
    variation,
    ...rest
  },
  ref
) => {
  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;
  const radioGroupTestId = getTestId(testId, ComponentClassName.RadioGroup);

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
      labelPosition,
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
      labelPosition,
    ]
  );

  return (
    <Fieldset
      className={classNames(
        ComponentClassName.Field,
        classNameModifier(ComponentClassName.Field, size),
        ComponentClassName.RadioGroupField,
        className
      )}
      isDisabled={isDisabled}
      legend={legend}
      legendHidden={legendHidden}
      ref={ref}
      role="radiogroup"
      size={size}
      testId={testId}
      variation={variation}
      {...rest}
    >
      <FieldDescription
        id={descriptionId}
        labelHidden={legendHidden}
        descriptiveText={descriptiveText}
      />
      <Flex
        aria-describedby={ariaDescribedBy}
        className={ComponentClassName.RadioGroup}
        id={fieldId}
        testId={radioGroupTestId}
      >
        <RadioGroupContext.Provider value={radioGroupContextValue}>
          {children}
        </RadioGroupContext.Provider>
      </Flex>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Fieldset>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/radiogroupfield)
 */
export const RadioGroupField: ForwardRefPrimitive<
  BaseRadioGroupFieldProps,
  'fieldset'
> = primitiveWithForwardRef(RadioGroupFieldPrimitive);

RadioGroupField.displayName = 'RadioGroupField';
