import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';
import { RadioGroupContext, RadioGroupContextType } from './context';
import { RadioGroupFieldProps, Primitive } from '../types';
import { getTestId } from '../utils/getTestId';
import { useStableId } from '../utils/useStableId';

// Note: RadioGroupField doesn't extend the JSX.IntrinsicElements<'input'> types (instead extending 'typeof Flex')
// because all rest props are passed to Flex container
const RadioGroupFieldPrimitive: Primitive<RadioGroupFieldProps, typeof Flex> = (
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
    labelPosition,
    onChange,
    name,
    size,
    testId,
    value,
    ...rest
  },
  ref
) => {
  const fieldId = useStableId(id);
  const descriptionId = useStableId();
  const ariaDescribedBy = descriptiveText ? descriptionId : undefined;
  const radioGroupTestId = getTestId(testId, ComponentClassNames.RadioGroup);

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
    <Flex
      as="fieldset"
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.RadioGroupField,
        className
      )}
      data-size={size}
      ref={ref}
      role="radiogroup"
      testId={testId}
      {...rest}
    >
      <VisuallyHidden as="legend">{label}</VisuallyHidden>
      <Label aria-hidden visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <Flex
        aria-describedby={ariaDescribedBy}
        className={ComponentClassNames.RadioGroup}
        id={fieldId}
        testId={radioGroupTestId}
      >
        <RadioGroupContext.Provider value={radioGroupContextValue}>
          {children}
        </RadioGroupContext.Provider>
      </Flex>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/radiogroupfield)
 */
export const RadioGroupField = React.forwardRef(RadioGroupFieldPrimitive);

RadioGroupField.displayName = 'RadioGroupField';
