import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconAdd, IconRemove } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { Primitive } from '../types/view';
import { SharedText } from '../shared/i18n';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { StepperFieldProps } from '../types/stepperField';
import { useStableId } from '../shared/utils';
import { useStepper } from './useStepper';

export const DECREASE_ICON = 'decrease-icon';
export const INCREASE_ICON = 'increase-icon';

const StepperFieldPrimitive: Primitive<StepperFieldProps, 'input'> = (
  props,
  ref
) => {
  const {
    className,
    descriptiveText,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    defaultValue,
    errorMessage,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    label,
    labelHidden = false,
    onStepChange,
    size,
    variation,
    testId,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    value: controlledValue,
    inputStyles,
    ..._rest
  } = props;

  const fieldId = useStableId(id);
  const descriptionId = useStableId();

  const { baseStyleProps, flexContainerStyleProps, rest } =
    splitPrimitiveProps(_rest);

  const {
    step,
    value,
    inputValue,
    handleDecrease,
    handleIncrease,
    handleOnBlur,
    handleOnChange,
    handleOnWheel,
    setInputValue,
    shouldDisableDecreaseButton,
    shouldDisableIncreaseButton,
  } = useStepper(props);

  React.useEffect(() => {
    const isControlled = controlledValue !== undefined;
    if (isControlled) {
      setInputValue(controlledValue);
    }
  }, [controlledValue, setInputValue]);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.StepperField,
        className
      )}
      data-size={size}
      data-variation={variation}
      testId={testId}
      {...baseStyleProps}
      {...flexContainerStyleProps}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        id={descriptionId}
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        outerStartComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${SharedText.StepperField.ariaLabel.DecreaseTo} ${
              value - step
            }`}
            className={ComponentClassNames.StepperFieldButtonDecrease}
            data-invalid={hasError}
            isDisabled={shouldDisableDecreaseButton}
            onClick={handleDecrease}
            size={size}
          >
            <IconRemove data-testid={DECREASE_ICON} />
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${SharedText.StepperField.ariaLabel.IncreaseTo} ${
              value + step
            }`}
            className={ComponentClassNames.StepperFieldButtonIncrease}
            data-invalid={hasError}
            isDisabled={shouldDisableIncreaseButton}
            onClick={handleIncrease}
            size={size}
          >
            <IconAdd data-testid={INCREASE_ICON} />
          </FieldGroupIconButton>
        }
      >
        <Input
          aria-describedby={descriptionId}
          className={ComponentClassNames.StepperFieldInput}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onWheel={handleOnWheel}
          ref={ref}
          size={size}
          variation={variation}
          type="number"
          value={inputValue}
          {...inputStyles}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const StepperField = React.forwardRef(StepperFieldPrimitive);

StepperField.displayName = 'StepperField';
