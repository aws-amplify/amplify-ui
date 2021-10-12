import classNames from 'classnames';
import * as React from 'react';

import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconAdd, IconRemove } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { StepperFieldProps } from '../types/stepperField';
import { ComponentClassNames } from '../shared/constants';
import {
  isControlledComponent,
  isFunction,
  useStableId,
} from '../shared/utils';

export const StepperField: React.FC<StepperFieldProps> = ({
  alignContent,
  alignItems,
  className,
  defaultValue,
  descriptiveText,
  direction,
  errorMessage,
  gap,
  hasError = false,
  id,
  isDisabled,
  isReadOnly,
  isRequired,
  justifyContent,
  label,
  labelHidden = true,
  max,
  min,
  onDecrease,
  onIncrease,
  onStepChange,
  size,
  step,
  value,
  wrap,
  ...rest
}) => {
  const fieldId = useStableId(id);

  max = Math.max(min, max);

  // Maintain uncontrolled state
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const isControlled = isControlledComponent(value);
  value = isControlled ? value : uncontrolledValue;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) {
      setUncontrolledValue(Number(event.target.value));
    }

    if (isFunction(onStepChange)) {
      onStepChange(Number(event.target.value));
    }
  };

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(ComponentClassNames.StepperField, className)}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      wrap={wrap}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        outerStartComponent={
          <FieldGroupIconButton ariaLabel="" onClick={onDecrease}>
            <IconRemove />
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton ariaLabel="" onClick={onIncrease}>
            <IconAdd />
          </FieldGroupIconButton>
        }
      >
        <Input
          // defaultValue={defaultValue}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          max={max}
          min={min}
          onChange={onChange}
          size={size}
          step={step}
          type="number"
          value={value}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
