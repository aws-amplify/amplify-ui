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
import { SharedText } from '../shared/i18n';
import {
  isControlledComponent,
  isFunction,
  useStableId,
} from '../shared/utils';

export const StepperField: React.FC<StepperFieldProps> = ({
  alignContent,
  alignItems,
  className,
  defaultValue = 0,
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
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  onDecrease,
  onIncrease,
  onStepChange,
  size,
  step = 1,
  value,
  wrap,
  ...rest
}) => {
  const fieldId = useStableId(id);

  // Make sure max value is greater than or equal to min value
  max = Math.max(min, max);

  /**
   * Maintain an internal state for uncontrolled components
   * This enables us to correct any invalid input versus purely relying on an uncontrolled input
   */
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);

  const isControlled = isControlledComponent(value);
  value = isControlled ? value : uncontrolledValue;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue = Number(event.target.value);
    if (isNaN(newValue)) {
      return;
    }

    // Make sure new value is not outside the bound
    newValue = Math.min(newValue, max);
    newValue = Math.max(newValue, min);

    // Round it to the closest step value
    const remainder = (newValue - min) % step;
    newValue = newValue - remainder + Math.round(remainder / step) * step;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    if (isFunction(onStepChange)) {
      onStepChange(newValue);
    }
  };

  const handleIncrease: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isControlled) {
      setUncontrolledValue(value + step);
    }

    if (isFunction(onStepChange)) {
      onStepChange(value + step);
    }

    if (isFunction(onIncrease)) {
      onIncrease();
    }
  };

  const handleDecrease: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isControlled) {
      setUncontrolledValue(value - step);
    }

    if (isFunction(onStepChange)) {
      onStepChange(value - step);
    }

    if (isFunction(onDecrease)) {
      onDecrease();
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
          <FieldGroupIconButton
            ariaLabel={`${SharedText.StepperField.ariaLabel.DecreaseTo} ${
              value - step
            }`}
            isDisabled={value - step < min}
            onClick={handleDecrease}
          >
            <IconRemove />
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton
            ariaLabel={`${SharedText.StepperField.ariaLabel.IncreaseTo} ${
              value + step
            }`}
            isDisabled={value + step > max}
            onClick={handleIncrease}
          >
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
